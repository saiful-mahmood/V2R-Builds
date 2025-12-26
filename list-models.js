const fetch = require('node-fetch');

const API_KEY = process.env.NANO_BANANA_API_KEY || process.argv[2];

if (!API_KEY) {
    console.error('Please provide API Key as argument');
    process.exit(1);
}

async function listModels() {
    console.log('Listing available models...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log('\n✅ Available Models:');
            data.models.forEach(model => {
                if (model.name.includes('imagen') || model.supportedGenerationMethods.includes('generateImages') || model.supportedGenerationMethods.includes('predict')) {
                    console.log(`- ${model.name} (${model.supportedGenerationMethods.join(', ')})`);
                }
            });

            console.log('\n(Full list filtered for brevity. Showing only image-related or predict models)');
        } else {
            console.log('❌ Error:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Network Error:', error.message);
    }
}

listModels();
