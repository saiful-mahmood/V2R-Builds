# Cloudinary + EmailJS Setup for Vision Renderer

## Why This Solution?
- ✅ **25GB free storage** (more than enough)
- ✅ **10MB per image** upload limit
- ✅ **Auto-delete after 30 days** (keeps storage clean)
- ✅ **Reliable email delivery** with image links
- ✅ **Your beautiful UI** stays intact
- ✅ **No file size issues** (just sending URLs)

---

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email
4. You'll be taken to the dashboard

---

## Step 2: Get Your Cloudinary Credentials

On the dashboard, you'll see:

```
Cloud Name: your-cloud-name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123
```

**Copy these three values** - you'll need them!

---

## Step 3: Enable Unsigned Uploads

For security, we need to create an "upload preset":

1. Click **Settings** (gear icon) in the top right
2. Go to **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: `vision_uploads`
   - **Signing mode**: **Unsigned** ⬅️ Important!
   - **Folder**: `vision-renders`
   - **Unique filename**: ✅ Yes
   - **Overwrite**: ❌ No
   - **Tags**: `vision,auto-delete` (we'll use this for cleanup)
6. Click **Save**

**Copy the preset name**: `vision_uploads`

---

## Step 4: Set Up Auto-Delete (Optional but Recommended)

Cloudinary doesn't have built-in auto-delete, but we can set up a simple manual process:

### Option A: Manual Cleanup (Easiest)
Every month, go to Cloudinary dashboard:
1. Click **Media Library**
2. Filter by tag: `auto-delete`
3. Sort by **Upload date** (oldest first)
4. Select images older than 30 days
5. Click **Delete**

### Option B: Automated Cleanup (Advanced)
I can create a simple script you run monthly that auto-deletes old images. Let me know if you want this!

---

## Step 5: Update EmailJS Template

Go back to your EmailJS template and update it to show image links:

Replace the images section with:

```html
<!-- Images Section -->
<div style="margin-top: 30px;">
    <h3 style="color: #334155; font-size: 16px; margin-bottom: 15px;">📸 Uploaded Photos:</h3>
    <p style="color: #64748b; margin-bottom: 15px;">Click the links below to view full-resolution images:</p>
    
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
        <p style="margin: 8px 0;">
            <strong>Image 1:</strong> <a href="{{image_url_1}}" style="color: #3b82f6; text-decoration: none;" target="_blank">View Image →</a>
        </p>
        <p style="margin: 8px 0;">
            <strong>Image 2:</strong> <a href="{{image_url_2}}" style="color: #3b82f6; text-decoration: none;" target="_blank">View Image →</a>
        </p>
        <p style="margin: 8px 0;">
            <strong>Image 3:</strong> <a href="{{image_url_3}}" style="color: #3b82f6; text-decoration: none;" target="_blank">View Image →</a>
        </p>
        <p style="margin: 8px 0;">
            <strong>Image 4:</strong> <a href="{{image_url_4}}" style="color: #3b82f6; text-decoration: none;" target="_blank">View Image →</a>
        </p>
        <p style="margin: 8px 0;">
            <strong>Image 5:</strong> <a href="{{image_url_5}}" style="color: #3b82f6; text-decoration: none;" target="_blank">View Image →</a>
        </p>
    </div>
    
    <p style="color: #64748b; font-size: 14px; margin-top: 15px; font-style: italic;">
        💡 Tip: Right-click any link and select "Save link as..." to download the image.
    </p>
</div>
```

**Save the template!**

---

## Step 6: Provide Your Credentials

Once you have:
1. ✅ **Cloud Name**
2. ✅ **Upload Preset** (`vision_uploads`)

**Give them to me** and I'll update the vision.html code!

---

## What You'll Get

When someone submits the form:

1. ✅ **Images upload to Cloudinary** (automatic)
2. ✅ **Email sent via EmailJS** with:
   - Customer name, email, phone
   - Vision description
   - **5 clickable links** to view images
3. ✅ **Images stored for 30+ days** (manual cleanup)
4. ✅ **Full resolution** images available
5. ✅ **Download links** in email

---

## Storage Management

- **Free tier**: 25GB storage
- **Average image**: ~3-5MB
- **Capacity**: ~5,000-8,000 images
- **With monthly cleanup**: Unlimited!

If you clean up images older than 30 days monthly, you'll never run out of space!

---

## Ready?

Create your Cloudinary account and give me:
1. Your **Cloud Name**
2. Your **Upload Preset** name

And I'll integrate it into vision.html! 🚀
