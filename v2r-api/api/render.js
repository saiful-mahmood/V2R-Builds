// Google Gemini Rendering API (Smart Fallback)
// Attempts Image Generation (Gemini 2.0) -> Falls back to Text Description (Gemini 1.5)

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Enable CORS
    const allowedOrigins = ['https://v2rbuilds.com', 'http://localhost:5500', 'http://127.0.0.1:5500'];
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

        // --- ATTEMPT 1: IMAGE GENERATION (Gemini 2.0 Flash Exp) ---
        try {
            console.log('Attempting Image Generation with Gemini 2.0...');
            const imagePrompt = `Generate a photorealistic image of this room remodeled as: ${userPrompt}. Maintain the exact layout and perspective.`;

            const response2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: imagePrompt },
                            { inline_data: { mime_type: 'image/jpeg', data: base64Image } }
                        ]
                    }],
                    generationConfig: { response_mime_type: "image/jpeg" }
                })
            });

            if (response2.ok) {
                const data2 = await response2.json();
                // Check for image data in response
                // Gemini 2.0 image gen usually returns inline_data in parts
                const generatedImageBase64 = data2.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data;

                if (generatedImageBase64) {
                    return res.status(200).json({
                        success: true,
                        renderUrl: `data:image/jpeg;base64,${generatedImageBase64}`,
                        modelUsed: 'gemini-2.0-flash-exp'
                    });
                }
                // If ok but no image (maybe text response), throw to fallback
                throw new Error('No image data in Gemini 2.0 response');
            } else {
                // If 429 or other error, throw to fallback
                const errText = await response2.text();
                throw new Error(`Gemini 2.0 Error: ${response2.status} - ${errText}`);
            }

        } catch (error2) {
            console.warn('Gemini 2.0 failed, falling back to 1.5:', error2.message);

            // --- ATTEMPT 2: TEXT DESCRIPTION (Gemini 1.5 Flash) ---
            // This model has a generous free tier

            const textPrompt = `You are a professional interior designer. Analyze this room image and describe exactly how it would look if remodeled based on this request: "${userPrompt}". Provide a vivid, detailed visual description.`;

            const response15 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
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

            if (!response15.ok) {
                throw new Error(`Gemini 1.5 Error: ${response15.status}`);
            }

            const data15 = await response15.json();
            const description = data15.candidates?.[0]?.content?.parts?.[0]?.text || "Visualization generated.";

            return res.status(200).json({
                success: true,
                renderUrl: imageUrl, // Return original as placeholder
                description: description,
                modelUsed: 'gemini-1.5-flash',
                fallbackReason: 'Image generation quota exceeded (Free Tier). Showing AI design concept instead.'
            });
        }

    } catch (error) {
        console.error('Render error:', error);
        return res.status(500).json({ error: 'Rendering failed', message: error.message });
    }
};
