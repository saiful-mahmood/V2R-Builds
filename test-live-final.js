const fetch = require('node-fetch');

async function testLiveRender() {
    console.log('Testing Live API with NEW KEY at https://v2-r-builds.vercel.app/api/render ...');

    try {
        const response = await fetch('https://v2-r-builds.vercel.app/api/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageUrl: "https://placehold.co/600x400.png",
                userPrompt: "Modern minimalist living room with large windows"
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Response Received:');
            console.log('------------------------------------------------');
            console.log('Success:', data.success);
            console.log('Model Used:', data.modelUsed);

            if (data.modelUsed === 'imagen-3.0-generate-001') {
                console.log('🎉 GREAT NEWS! You have access to Imagen 3 (Images)!');
            } else {
                console.log('ℹ️ Status: Using Fallback Model (Text Description).');
                console.log('Fallback Reason:', data.fallbackReason || 'None');
            }

            if (data.description) {
                console.log('Description Full:', data.description);
            }
            console.log('------------------------------------------------');
        } else {
            console.log(`❌ API Error: ${response.status}`);
            console.log(await response.text());
        }
    } catch (error) {
        console.error('Network Error:', error.message);
    }
}

testLiveRender();
