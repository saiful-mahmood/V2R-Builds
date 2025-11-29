# EmailJS Setup Guide for V2R Builds

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free)
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps
5. **Copy your Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. **Template Name**: "Vision Render Request"
4. **Subject**: `New Vision Render Request from {{from_name}}`
5. **Content** (paste this):

```
New AI Vision Render Request

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Vision Prompt:
{{vision_prompt}}

---
Attachments: {{attachment_count}} image(s)
Note: Images are sent as base64 attachments in this email.
```

6. Click "Save"
7. **Copy your Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find "Public Key" section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxxxxxx`)

## Step 5: Update vision.html
Replace these values in `vision.html`:

```javascript
// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // From Step 2
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // From Step 3
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // From Step 4
```

## Important Notes

### File Upload Limits
- **EmailJS Free Plan**: 200 emails/month
- **Max attachment size**: 500KB per file (EmailJS limitation)
- **Total email size**: 50KB (including all attachments)
- Images will be automatically compressed to meet these limits

### Why These Limits?
EmailJS sends files as base64-encoded data in the email, which increases file size by ~33%. The service has these limits to prevent abuse.

### Workarounds for Large Files
If users upload large images:
1. The code will automatically compress them to fit
2. Quality will be reduced if necessary
3. Users will be notified if compression is needed

## Testing
1. After setup, test the form at: https://v2rbuilds.com/vision.html
2. Check your email for the submission
3. Verify all images are attached

## Troubleshooting

### Not receiving emails?
- Check spam folder
- Verify email service is connected in EmailJS dashboard
- Check EmailJS dashboard for error logs

### Images not attaching?
- Make sure images are under 500KB each
- Try with smaller test images first
- Check browser console for errors

## Free Plan Limits
- ✅ 200 emails/month
- ✅ File attachments supported
- ✅ Custom templates
- ✅ Email notifications
- ❌ No phone support (email only)

---

**Ready to implement?** Once you have your Service ID, Template ID, and Public Key, the code is already updated and ready to use!
