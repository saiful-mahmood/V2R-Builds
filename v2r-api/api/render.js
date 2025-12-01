// Nano Banana Pro AI Rendering API
// Securely generates AI renders without exposing API credentials

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Enable CORS for your domain
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://v2rbuilds.com');
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
        const { imageUrl, prompt } = req.body;

        if (!imageUrl || !prompt) {
            return res.status(400).json({ error: 'Image URL and prompt are required' });
        }

        // Nano Banana Pro API key from environment variables
        const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY;

        if (!NANO_BANANA_API_KEY) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Call Nano Banana Pro API
        // Note: Update this endpoint based on Nano Banana Pro's actual API documentation
        const response = await fetch('https://api.nanobanana.ai/v1/render', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NANO_BANANA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_url: imageUrl,
                prompt: prompt,
                // Add any other parameters required by Nano Banana Pro
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Nano Banana API error: ${errorText}`);
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            renderUrl: data.output_url || data.image_url, // Adjust based on actual API response
            data: data
        });

    } catch (error) {
        console.error('Render error:', error);
        return res.status(500).json({
            error: 'Rendering failed',
            message: error.message
        });
    }
};
