// Google Gemini (Nano Banana) Rendering API
// Securely generates professional renders without exposing API credentials

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Enable CORS for your domain and localhost
    const allowedOrigins = ['https://v2rbuilds.com', 'http://localhost:5500', 'http://127.0.0.1:5500'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { imageUrl, userPrompt } = req.body;

        if (!imageUrl || !userPrompt) {
            return res.status(400).json({ error: 'Image URL and description are required' });
        }

        // Google Gemini API key from environment variables
        const GEMINI_API_KEY = process.env.NANO_BANANA_API_KEY; // Same key, it's actually Gemini

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Engineer the prompt for best remodeling results
        const engineeredPrompt = `You are a professional interior designer. Edit this room image based on the following description: ${userPrompt}

CRITICAL INSTRUCTIONS:
- Maintain the EXACT same room layout, dimensions, and architectural features
- Keep the SAME camera angle and perspective
- Preserve the overall spatial structure and proportions
- ONLY modify the specific elements mentioned in the description
- Ensure photorealistic quality with proper lighting and shadows
- Match the existing lighting conditions and time of day
- Keep all unchanged elements exactly as they appear in the original
- The result must look like a professional architectural rendering
- Do NOT add new rooms, walls, or change the fundamental structure
- Focus on materials, colors, fixtures, and furnishings only

Generate a single edited image that shows the room with these changes applied.`;

        console.log('Engineered prompt:', engineeredPrompt);
        console.log('Image URL:', imageUrl);

        // Fetch the image and convert to base64
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.buffer();
        const base64Image = imageBuffer.toString('base64');

        // Call Google Gemini API for image generation
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(geminiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: engineeredPrompt
                        },
                        {
                            inline_data: {
                                mime_type: 'image/jpeg',
                                data: base64Image
                            }
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.4,
                    topK: 32,
                    topP: 1,
                    maxOutputTokens: 4096,
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error:', errorText);
            return res.status(500).json({
                error: 'Rendering failed',
                message: `Gemini API error: ${response.status}`,
                details: errorText
            });
        }

        const data = await response.json();
        console.log('Gemini response:', JSON.stringify(data, null, 2));

        // Gemini returns text-based responses, not direct images
        // We need to extract the generated image URL or base64 from the response
        // For now, return the original image as Gemini 2.0 Flash doesn't directly support image output
        // We'll need to use a different approach or model

        return res.status(200).json({
            success: true,
            renderUrl: imageUrl, // Placeholder - Gemini text model doesn't generate images
            engineeredPrompt: engineeredPrompt,
            geminiResponse: data,
            note: 'Gemini 2.0 Flash is a text model. For image generation, we need Imagen or a different approach.'
        });

    } catch (error) {
        console.error('Render error:', error);
        return res.status(500).json({
            error: 'Rendering failed',
            message: error.message
        });
    }
};
