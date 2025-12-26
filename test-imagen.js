const fetch = require('node-fetch');

const API_KEY = process.argv[2];
if (!API_KEY) {
    console.error('Please provide an API key: node test-imagen.js <YOUR_KEY>');
    process.exit(1);
}

async function testImagen() {
    console.log('Testing Imagen 3 Access...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [{ prompt: "A futuristic car" }],
                parameters: { sampleCount: 1 }
            })
        });

        if (response.ok) {
            console.log('✅ SUCCESS! Key has access to Imagen 3.');
        } else {
            console.log(`❌ FAILED: ${response.status} - ${await response.text()}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testImagen();
