// Google Gemini Rendering API (Smart Fallback + Safety Net)
// Attempts Image Generation (Gemini 2.0) -> Falls back to Text Description (Gemini 1.5) -> Safety Net

const fetch = require('node-fetch');

// Trigger deploy: v1.1
module.exports = async (req, res) => {
    // Enable CORS
    const allowedOrigins = ['https://v2rbuilds.com', 'https://www.v2rbuilds.com', 'http://localhost:5500', 'http://127.0.0.1:5500'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { imageUrl, userPrompt } = req.body;
        if (!imageUrl || !userPrompt) return res.status(400).json({ error: 'Missing data' });

        const GEMINI_API_KEY = process.env.NANO_BANANA_API_KEY;
        if (!GEMINI_API_KEY) return res.status(500).json({ error: 'Server config error' });

        // Fetch image once
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.buffer();
        const base64Image = imageBuffer.toString('base64');

        let gemini2Error = '';

        // --- ATTEMPT 1: IMAGE GENERATION (Imagen 3) ---
        try {
            console.log('Attempting Image Generation with Imagen 3...');
            // Construct a detailed prompt since Imagen 3 (via this endpoint) is likely Text-to-Image
            const imagePrompt = `Photorealistic interior design render. ${userPrompt}. High quality, 4k, architectural photography.`;

            const response2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [
                        { prompt: imagePrompt }
                    ],
                    parameters: {
                        sampleCount: 1,
                        aspectRatio: "4:3"
                    }
                })
            });

            if (response2.ok) {
                const data2 = await response2.json();

                // Imagen 3 Response Format: { predictions: [ { bytesBase64Encoded: "..." } ] }
                const generatedImageBase64 = data2.predictions?.[0]?.bytesBase64Encoded;

                if (generatedImageBase64) {
                    return res.status(200).json({
                        success: true,
                        renderUrl: `data:image/jpeg;base64,${generatedImageBase64}`,
                        modelUsed: 'imagen-3.0-generate-001'
                    });
                }

                // If no image, check for error/text
                throw new Error('No image data in Imagen 3 response');
            } else {
                const errText = await response2.text();
                // If 404, it means model not found (user doesn't have access)
                throw new Error(`Imagen 3 Error: ${response2.status} - ${errText}`);
            }

        } catch (error2) {
            console.warn('Imagen 3 failed, falling back to Gemini Text:', error2.message);
            gemini2Error = error2.message;

            // --- ATTEMPT 2: TEXT DESCRIPTION (Gemini 1.5 Flash 8b) ---
            try {
                const textPrompt = `You are a professional interior designer. Analyze this room image and describe exactly how it would look if remodeled based on this request: "${userPrompt}". Provide a vivid, detailed visual description.`;

                // Use gemini-1.5-flash-8b (Newer, lighter model) on v1beta
                const responseFallback = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: textPrompt },
                                { inline_data: { mime_type: 'image/jpeg', data: base64Image } }
                            ]
                        }]
                    })
                });

                if (!responseFallback.ok) {
                    const errText = await responseFallback.text();
                    throw new Error(`Fallback Error: ${responseFallback.status} - ${errText}`);
                }

                const dataFallback = await responseFallback.json();
                const description = dataFallback.candidates?.[0]?.content?.parts?.[0]?.text || "Visualization generated.";

                return res.status(200).json({
                    success: true,
                    renderUrl: imageUrl,
                    description: description,
                    modelUsed: 'gemini-1.5-flash-8b',
                    fallbackReason: `Image generation failed (${gemini2Error}). Showing AI design concept instead.`
                });
            } catch (errorFallback) {
                console.error('Fallback failed:', errorFallback.message);
                // Throw combined error to safety net
                throw new Error(`Primary: ${gemini2Error} | Fallback: ${errorFallback.message}`);
            }
        }

    } catch (error) {
        console.error('Render error:', error);

        // --- SAFETY NET: MOCK RESPONSE ---
        return res.status(200).json({
            success: true,
            renderUrl: req.body.imageUrl,
            description: `We couldn't connect to the AI service at this moment.\n\nDebug Info:\n${error.message}\n\nHowever, based on your request for "${req.body.userPrompt}", we envision a space that perfectly balances functionality with your desired aesthetic.`,
            modelUsed: 'safety-net',
            fallbackReason: 'AI Service currently unavailable.'
        });
    }
};
