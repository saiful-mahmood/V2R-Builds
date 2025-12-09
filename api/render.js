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

        // --- STEP 1: ANALYZE IMAGE & GENERATE PROMPT (GPT-4o) ---
        console.log('Step 1: Analyzing image and generating prompt with GPT-4o...');

        // The user's style request (from frontend)
        const userStyleRequest = userPrompt || "modern, clean, contemporary design";

        const systemTemplate = `
        SYSTEM RULES:
        "Preserve the exact camera angle, geometry, proportions, depth, spatial layout, and perspective of the uploaded image.
        Do not redraw or reinterpret the scene.
        Only apply visual modifications requested by the user.
        Keep all architectural elements, room shape, walls, windows, doors, lighting sources, and structural boundaries exactly the same.
        Remove clutter or objects if requested without altering the background.
        Render the output as a photorealistic, high-resolution real photograph — not a drawing, sketch, or illustration.
        Maintain true-to-life materials, lighting, shadows, and textures.
        Avoid AI artifacts, distortions, hallucinated elements, or geometry changes."

        USER REQUEST:
        "Using the uploaded image as the base, remodel this room while preserving the exact same camera angle, perspective, layout, and structural geometry.
        Do not move walls, windows, cabinets, plumbing, or major architectural elements.
        
        Apply the following style changes only:
        ${userStyleRequest}
        
        Ensure the final output looks like a real photograph with correct lighting and material realism.
        Remove any clutter or unwanted objects without changing the background.
        Produce a refined, photorealistic renovated version matching the structure of the original image."
        `;

        const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert architectural visualization prompt engineer. Your goal is to write a DALL-E 3 prompt that will perfectly recreate the geometry of the input image while applying a new style. Describe the room's structure (perspective, windows, layout) in extreme detail within the prompt so DALL-E knows exactly what to draw."
                    },
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `Analyze this image and write a DALL-E 3 prompt based on these rules:\n${systemTemplate}\n\nOutput ONLY the final DALL-E 3 prompt text. Do not include any conversational text.`
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
                max_tokens: 500
            })
        });

        if (!analysisResponse.ok) {
            const errText = await analysisResponse.text();
            throw new Error(`GPT-4o Analysis Failed: ${analysisResponse.status} - ${errText}`);
        }

        const analysisData = await analysisResponse.json();
        const generatedDallePrompt = analysisData.choices[0].message.content;
        console.log('Generated DALL-E Prompt:', generatedDallePrompt.substring(0, 100) + '...');

        // --- STEP 2: GENERATE MODERNIZED IMAGE (DALL-E 3) ---
        console.log('Step 2: Generating image with DALL-E 3...');

        const generationResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: generatedDallePrompt,
                n: 1,
                size: "1024x1024",
                response_format: "b64_json",
                quality: "hd",
                style: "natural"
            })
        });

        if (!generationResponse.ok) {
            const errText = await generationResponse.text();
            throw new Error(`DALL-E 3 Generation Failed: ${generationResponse.status} - ${errText}`);
        }

        const generationData = await generationResponse.json();

        // Since we requested b64_json, we get the base64 string directly
        const rawBase64 = generationData.data[0].b64_json;
        const base64Image = `data:image/png;base64,${rawBase64}`;

        console.log('Image Generated and received as Base64.');

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
