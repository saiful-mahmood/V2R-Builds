// Cloudinary Image Upload API
// Securely uploads images to Cloudinary without exposing API credentials

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
        const { file, folder = 'vision-renders', tags = 'vision,auto-delete' } = req.body;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Cloudinary credentials from environment variables
        const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
        const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', folder);
        formData.append('tags', tags);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            url: data.secure_url,
            public_id: data.public_id
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            error: 'Upload failed',
            message: error.message
        });
    }
};
