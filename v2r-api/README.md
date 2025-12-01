# V2R Builds API - Vercel Serverless Functions

Secure backend API for V2R Builds website to hide sensitive API keys.

## 🔐 Security Features

- All API keys stored as environment variables
- CORS restricted to v2rbuilds.com only
- No keys exposed in frontend code

## 📡 API Endpoints

### 1. `/api/render` - AI Rendering
Generate AI renders using Nano Banana Pro.

**Request:**
```json
{
  "imageUrl": "https://...",
  "prompt": "modern farmhouse kitchen with white cabinets"
}
```

**Response:**
```json
{
  "success": true,
  "renderUrl": "https://..."
}
```

### 2. `/api/upload-image` - Image Upload
Upload images to Cloudinary.

**Request:**
```json
{
  "file": "base64_image_data",
  "folder": "vision-renders",
  "tags": "vision,auto-delete"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "public_id": "..."
}
```

### 3. `/api/send-email` - Email Sending
Send emails via EmailJS.

**Request:**
```json
{
  "templateParams": {
    "from_name": "John Doe",
    "from_email": "john@example.com",
    "message": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## 🚀 Deployment Steps

### 1. Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 2. Deploy This Project
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to this directory: `cd v2r-api`
3. Run: `vercel`
4. Follow the prompts to deploy

### 3. Set Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
NANO_BANANA_API_KEY=your_nano_banana_api_key
CLOUDINARY_CLOUD_NAME=dlaafdnoh
CLOUDINARY_UPLOAD_PRESET=vision_uploads
EMAILJS_SERVICE_ID=service_vtpa11r
EMAILJS_TEMPLATE_ID=template_rg8fibk
EMAILJS_PUBLIC_KEY=M2oh8gbmvTH4IhRpq
EMAILJS_PRIVATE_KEY=your_emailjs_private_key
```

### 4. Update Frontend
Update your vision.html to call these endpoints instead of using API keys directly.

## 📝 Notes

- The Nano Banana Pro endpoint (`/api/render.js`) needs to be updated with the correct API endpoint from their documentation
- All endpoints are CORS-protected to only allow requests from v2rbuilds.com
- Environment variables are never exposed to the client

## 🔄 Local Development

1. Install dependencies: `npm install`
2. Create `.env` file with your API keys
3. Run: `vercel dev`
4. Test at: `http://localhost:3000`
