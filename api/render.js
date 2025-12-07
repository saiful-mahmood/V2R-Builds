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
        // This is the CORRECT model for generating images.
        try {
            console.log('Attempting Image Generation with Imagen 3...');
            const imagePrompt = `Photorealistic interior design render. ${userPrompt}. High quality, 4k, architectural photography.`;

            const responseImagen = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`, {
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

            if (responseImagen.ok) {
                const dataImagen = await responseImagen.json();

                // Imagen 3 returns 'predictions' array with 'bytesBase64Encoded'
                const generatedImageBase64 = dataImagen.predictions?.[0]?.bytesBase64Encoded;

                if (generatedImageBase64) {
                    return res.status(200).json({
                        success: true,
                        renderUrl: `data:image/jpeg;base64,${generatedImageBase64}`,
                        modelUsed: 'imagen-3.0-generate-001'
                    });
                }
            } else {
                // Log error but don't crash - fall through to Gemini 2.0
                const errText = await responseImagen.text();
                console.warn(`Imagen 3 failed (${responseImagen.status}), falling back to Gemini 2.0 Text:`, errText);
                gemini2Error = `Imagen 3 Error: ${responseImagen.status}`;
            }
        } catch (errorImagen) {
            console.warn('Imagen 3 network error, falling back to Gemini 2.0:', errorImagen.message);
            gemini2Error = errorImagen.message;
        }

        // --- ATTEMPT 2: TEXT DESCRIPTION (Gemini 2.0 Flash Exp) ---
        // Fallback: If Image Gen fails, use Gemini 2.0 to describe the vision.
        try {
            console.log('Attempting Text Description with Gemini 2.0...');
            const textPrompt = `Generate a photorealistic image of this room remodeled as: ${userPrompt}. Maintain the exact layout and perspective.`;

            const response2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
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

            if (response2.ok) {
                const data2 = await response2.json();
                const generatedText = data2.candidates?.[0]?.content?.parts?.[0]?.text;

                if (generatedText) {
                    return res.status(200).json({
                        success: true,
                        renderUrl: imageUrl,
                        description: generatedText,
                        modelUsed: 'gemini-2.0-flash-exp (text-only)',
                        fallbackReason: gemini2Error ? `Image generation failed (${gemini2Error}). Showing AI design concept.` : 'Showing AI design concept.'
                    });
                }
            }

            // If even Gemini 2.0 fails, throw error
            throw new Error('Both Imagen 3 and Gemini 2.0 failed to return valid data.');

        } catch (error2) {
            console.error('Gemini 2.0 failed:', error2.message);
            // Throw combined error to safety net
            throw new Error(`Primary (Imagen): ${gemini2Error} | Fallback (Gemini): ${error2.message}`);
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
