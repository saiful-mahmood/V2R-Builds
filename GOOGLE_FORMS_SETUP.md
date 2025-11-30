# Google Forms Setup for Vision Renderer

## Why Google Forms?
- ✅ **Unlimited submissions** (completely free)
- ✅ **File uploads** stored in Google Drive automatically
- ✅ **Email notifications** for each submission
- ✅ **No size limits** (up to 10GB per file!)
- ✅ **Organized in spreadsheet** with links to uploaded images
- ✅ **Your beautiful UI** stays the same (users never see the Google Form)

---

## Step 1: Create Google Form

1. Go to https://forms.google.com
2. Click **"+ Blank"** to create a new form
3. Title it: **"Vision Render Requests"**

## Step 2: Add Form Fields

Add these fields **in this exact order**:

### Field 1: Full Name
- Type: **Short answer**
- Label: `Full Name`
- Required: ✅ Yes

### Field 2: Email Address
- Type: **Short answer**
- Label: `Email Address`
- Required: ✅ Yes
- Validation: Click ⋮ → Response validation → Text → Email

### Field 3: Phone Number
- Type: **Short answer**
- Label: `Phone Number`
- Required: ✅ Yes

### Field 4: Vision Description
- Type: **Paragraph**
- Label: `Vision Description`
- Required: ✅ Yes

### Field 5: Photos
- Type: **File upload**
- Label: `Photos of Your Space`
- Required: ✅ Yes
- Settings:
  - Click "..." → File upload settings
  - ✅ Allow multiple files
  - Maximum number of files: **5**
  - Maximum file size: **10 MB** (or higher if you want)
  - File types: **Image files** (JPG, PNG, etc.)

## Step 3: Configure Form Settings

1. Click **Settings** (gear icon) at top
2. Go to **Responses** tab
3. ✅ Enable "Collect email addresses"
4. ✅ Enable "Send respondents a copy of their response"
5. Click **Presentation** tab
6. Confirmation message: `Thank you! We've received your vision request and will send you a same-day render via email.`

## Step 4: Set Up Email Notifications

1. Click **Responses** tab in your form
2. Click the **Google Sheets** icon (green spreadsheet)
3. Create a new spreadsheet
4. In the spreadsheet, click **Tools** → **Notification rules**
5. Select: "Notify me when: **A user submits a form**"
6. Email: **Right away**
7. Click **Save**

Now you'll get an email every time someone submits!

## Step 5: Get Your Form URL

1. Click **Send** button (top right)
2. Click the **link icon** (<>)
3. Click **Shorten URL**
4. **Copy the form URL** (looks like: `https://forms.gle/xxxxx`)

## Step 6: Get Field Entry IDs

This is the tricky part - we need to find the internal IDs for each field:

1. Open your form in a new tab
2. Right-click anywhere → **View Page Source**
3. Search for `entry.` (Ctrl+F or Cmd+F)
4. Find these patterns and note the numbers:

```
entry.XXXXXXXXX  (for Full Name)
entry.YYYYYYYYY  (for Email)
entry.ZZZZZZZZZ  (for Phone)
entry.AAAAAAAAA  (for Vision Description)
entry.BBBBBBBBB  (for Photos)
```

**Write down these entry IDs** - you'll need them for the next step!

---

## Step 7: Update vision.html

Once you have the entry IDs, I'll update the code to submit to your Google Form instead of EmailJS.

**Tell me:**
1. Your Google Form URL (the shortened one from Step 5)
2. The 5 entry IDs (from Step 6)

And I'll update the code to make it work!

---

## What You'll Get

When someone submits the form:
1. ✅ You get an **instant email notification**
2. ✅ All data is saved in a **Google Sheet**
3. ✅ Images are automatically uploaded to **Google Drive**
4. ✅ The sheet has **direct links** to each image
5. ✅ You can download all images with one click

**No more size limits, no more errors, completely free!** 🎉
