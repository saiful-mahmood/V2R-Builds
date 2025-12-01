// EmailJS Email Sending API
// Securely sends emails via EmailJS without exposing API credentials

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
        const { templateParams } = req.body;

        if (!templateParams) {
            return res.status(400).json({ error: 'No template parameters provided' });
        }

        // EmailJS credentials from environment variables
        const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
        const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
        const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const emailData = {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            accessToken: EMAILJS_PRIVATE_KEY,
            template_params: templateParams
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`EmailJS error: ${errorText}`);
        }

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({
            error: 'Email sending failed',
            message: error.message
        });
    }
};
