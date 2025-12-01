// Nano Banana Pro Rendering API
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

        // Nano Banana Pro API key from environment variables
        const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY;

        if (!NANO_BANANA_API_KEY) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Engineer the prompt for best remodeling results
        const engineeredPrompt = `Professional interior design rendering: ${userPrompt}. 
    
IMPORTANT INSTRUCTIONS:
- Maintain the exact same room layout, dimensions, and architectural features
- Keep the same camera angle and perspective
- Preserve the overall spatial structure
- Only modify the specific elements mentioned in the description
- Ensure photorealistic quality with proper lighting and shadows
- Match the existing lighting conditions
- Keep any unchanged elements exactly as they appear
- Result should look like a professional architectural rendering`;

        console.log('Engineered prompt:', engineeredPrompt);
        console.log('Image URL:', imageUrl);

        // TODO: Need correct Nano Banana API endpoint
        // The gemininanoai.com endpoint is returning 405
        // This might need to use Google's Gemini API directly

        // For now, return a placeholder response
        // Once we have the correct API endpoint, we'll update this
        return res.status(200).json({
            success: true,
            renderUrl: imageUrl, // Return original image as placeholder
            engineeredPrompt: engineeredPrompt,
            note: 'Rendering API endpoint needs configuration. Please check Nano Banana API documentation for correct endpoint.'
        });

        /* Original code - keeping for reference:
        const response = await fetch(`https://gemininanoai.com/api/v1/generate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NANO_BANANA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: engineeredPrompt,
                image_url: imageUrl,
                num_images: 1,
                aspect_ratio: '1:1'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Nano Banana API error:', errorText);
            throw new Error(`Rendering service error: ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            renderUrl: data.images?.[0] || data.output_url || data.image_url,
            engineeredPrompt: engineeredPrompt
        });
        */

    } catch (error) {
        console.error('Render error:', error);
        return res.status(500).json({
            error: 'Rendering failed',
            message: error.message
        });
    }
};
