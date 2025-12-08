// OpenAI Rendering API (GPT-4o Vision + DALL-E 3)
// Pipeline: Analyze Image Structure -> Generate Modernized Version

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Enable CORS
    const allowedOrigins = ['https://v2rbuilds.com', 'https://www.v2rbuilds.com', 'http://localhost:5500', 'http://127.0.0.1:5500', 'https://v2-r-builds.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { imageUrl, userPrompt } = req.body;
        if (!imageUrl) return res.status(400).json({ error: 'Missing image URL' });

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Server config error: Missing OpenAI Key' });

        console.log('Starting OpenAI Render Pipeline...');

        // --- STEP 1: ANALYZE IMAGE STRUCTURE (GPT-4o) ---
        console.log('Step 1: Analyzing image structure with GPT-4o...');

        const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "Describe the architectural structure, perspective, window placement, ceiling height, and room layout of this image in extreme technical detail. Do not mention the current furniture style, colors, or clutter. Focus ONLY on the geometry and fixed elements."
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    "url": imageUrl,
                                    "detail": "high"
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 300
            })
        });

        if (!analysisResponse.ok) {
            const errText = await analysisResponse.text();
            throw new Error(`GPT-4o Analysis Failed: ${analysisResponse.status} - ${errText}`);
        }

        const analysisData = await analysisResponse.json();
        const structuralDescription = analysisData.choices[0].message.content;
        console.log('Structure Analyzed:', structuralDescription.substring(0, 50) + '...');

        // --- STEP 2: GENERATE MODERNIZED IMAGE (DALL-E 3) ---
        console.log('Step 2: Generating image with DALL-E 3...');

        // Use userPrompt if provided, otherwise default
        const instruction = userPrompt || "Redesign this room based on the uploaded photo. Keep all core architectural elements in the same position (walls, windows, doors, layout). Maintain the same perspective and camera angle. Transform the space into a modern, clean, contemporary design with updated finishes. Use: modern lighting, neutral color palette, sleek cabinetry and fixtures, minimalist decor, improved brightness and clarity. Keep the furniture and major items in the same locations but update them to modern equivalents. Make the final image look realistic, high-end, and professionally staged.";

        // Combine instruction with structural description
        const finalPrompt = `${instruction}. The room structure is: ${structuralDescription}.`;

        const generationResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: finalPrompt,
                n: 1,
                size: "1024x1024",
                quality: "hd",
                style: "natural"
            })
        });

        if (!generationResponse.ok) {
            const errText = await generationResponse.text();
            throw new Error(`DALL-E 3 Generation Failed: ${generationResponse.status} - ${errText}`);
        }

        const generationData = await generationResponse.json();
        const generatedImageUrl = generationData.data[0].url;

        console.log('Image Generated! Fetching and converting to Base64...');

        // Fetch the image on the server to avoid CORS on client
        const imageFetch = await fetch(generatedImageUrl);
        const imageBuffer = await imageFetch.buffer();
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        return res.status(200).json({
            success: true,
            renderUrl: base64Image, // Return Base64 directly
            description: "Modernized visualization generated by DALL-E 3 based on your room's structure.",
            modelUsed: 'dall-e-3'
        });

    } catch (error) {
        console.error('Render error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            fallbackReason: 'OpenAI Service Error'
        });
    }
};
