# 🚀 Vercel Deployment Guide

## Step 1: Create Vercel Account (2 minutes)

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories
4. You'll be redirected to your Vercel dashboard

---

## Step 2: Deploy the API (5 minutes)

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your **V2R Builds** repository
4. **Root Directory**: Click "Edit" → Enter `v2r-api`
5. Click **"Deploy"**
6. Wait for deployment to complete (~1 minute)

### Option B: Deploy via CLI

```bash
cd "/Users/saifulmahmood/Documents/GitHub/V2R Builds/v2r-api"
npm install -g vercel
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **v2r-api**
- Directory? **./  (current directory)**
- Override settings? **N**

---

## Step 3: Add Environment Variables (3 minutes)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **v2r-api** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in sidebar
5. Add each variable:

### Required Variables:

| Name | Value | Where to Find |
|------|-------|---------------|
| `NANO_BANANA_API_KEY` | Your Nano Banana API key | Nano Banana Pro dashboard |
| `CLOUDINARY_CLOUD_NAME` | `dlaafdnoh` | Already set |
| `CLOUDINARY_UPLOAD_PRESET` | `vision_uploads` | Already set |
| `EMAILJS_SERVICE_ID` | `service_vtpa11r` | Already set |
| `EMAILJS_TEMPLATE_ID` | `template_rg8fibk` | Already set |
| `EMAILJS_PUBLIC_KEY` | `M2oh8gbmvTH4IhRpq` | Already set |
| `EMAILJS_PRIVATE_KEY` | Your EmailJS private key | EmailJS dashboard → Account → API Keys |

**For each variable:**
1. Click **"Add New"**
2. Enter **Name** (e.g., `NANO_BANANA_API_KEY`)
3. Enter **Value**
4. Select **Production, Preview, Development**
5. Click **"Save"**

---

## Step 4: Get Your API URLs

After deployment, you'll get URLs like:
```
https://v2r-api-xxx.vercel.app/api/render
https://v2r-api-xxx.vercel.app/api/upload-image
https://v2r-api-xxx.vercel.app/api/send-email
```

**Copy your deployment URL** - you'll need it for the next step!

---

## Step 5: Update Frontend (I'll do this)

Once you have your Vercel URL, I'll update:
- `vision.html` to use your secure API endpoints
- Remove all hardcoded API keys from the frontend

---

## 🔑 Where to Find Missing Keys

### Nano Banana Pro API Key
1. Go to https://nanobanana.ai (or your Nano Banana dashboard)
2. Navigate to **API Keys** or **Settings**
3. Copy your API key

### EmailJS Private Key
1. Go to https://dashboard.emailjs.com
2. Click **Account** → **API Keys**
3. Copy your **Private Key** (different from Public Key)

---

## ✅ Verification

After deployment, test your endpoints:

```bash
# Test render endpoint
curl -X POST https://your-url.vercel.app/api/render \
  -H "Content-Type: application/json" \
  -d '{"imageUrl":"test","prompt":"test"}'

# Should return: {"error":"..."}  (expected without valid data)
```

---

## 🆘 Troubleshooting

**Problem:** Deployment fails
- **Solution:** Make sure you're in the `v2r-api` directory

**Problem:** API returns 500 error
- **Solution:** Check that all environment variables are set correctly

**Problem:** CORS error
- **Solution:** Make sure you're calling from v2rbuilds.com (or localhost for testing)

---

## 📝 Next Steps

Once deployed:
1. ✅ Give me your Vercel deployment URL
2. ✅ I'll update vision.html to use your secure endpoints
3. ✅ Test the AI rendering feature
4. ✅ Deploy to production

**Ready to deploy?** Let me know when you have your Vercel URL! 🚀
