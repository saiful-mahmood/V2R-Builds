# V2R Builds - Free Hosting Guide

## Option 1: Netlify (Recommended - Easiest)

### Why Netlify?
- ✅ Drag-and-drop deployment (no coding needed)
- ✅ Free SSL certificate (HTTPS)
- ✅ Custom domain support
- ✅ Automatic form handling (works with Formspree)
- ✅ Fast global CDN
- ✅ Free tier: Unlimited sites, 100GB bandwidth/month

### Deployment Steps:

1. **Sign Up**
   - Go to https://www.netlify.com/
   - Sign up for free (GitHub, Google, or email)

2. **Deploy Your Site**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your entire "V2R Builds" folder
   - Wait 30 seconds - site is live!
   - You'll get a URL like: `https://random-name-123.netlify.app`

3. **Connect GoDaddy Domain**
   
   **In Netlify:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., v2rbuilds.com)
   - Netlify will show you DNS records to add
   
   **In GoDaddy:**
   - Log in to GoDaddy
   - Go to your domain → DNS Management
   - Add these records (Netlify provides exact values):
     
     **For root domain (v2rbuilds.com):**
     - Type: A
     - Name: @
     - Value: 75.2.60.5 (Netlify's IP)
     - TTL: 600
     
     **For www subdomain:**
     - Type: CNAME
     - Name: www
     - Value: your-site-name.netlify.app
     - TTL: 600
   
   - Save changes
   - Wait 24-48 hours for DNS propagation (usually 1-2 hours)

4. **Enable HTTPS**
   - In Netlify → Domain settings
   - Click "Verify DNS configuration"
   - Click "Provision certificate" (free SSL)
   - Done! Your site is now secure with HTTPS

---

## Option 2: GitHub Pages (Free, More Technical)

### Why GitHub Pages?
- ✅ Free hosting from GitHub
- ✅ Custom domain support
- ✅ Free SSL certificate
- ✅ Version control included
- ✅ Good for developers

### Deployment Steps:

1. **Create GitHub Repository**
   ```bash
   cd "/Users/saifulmahmood/Documents/GitHub/V2R Builds"
   git init
   git add .
   git commit -m "Initial commit - V2R Builds website"
   ```

2. **Push to GitHub**
   - Go to https://github.com/new
   - Create a new repository named "v2r-builds"
   - Don't initialize with README
   - Copy the commands and run:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/v2r-builds.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save
   - Your site will be live at: `https://YOUR-USERNAME.github.io/v2r-builds/`

4. **Connect GoDaddy Domain**
   
   **In GitHub:**
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Save
   
   **In GoDaddy:**
   - Go to DNS Management
   - Add these records:
     
     **A Records (add all 4):**
     - Type: A, Name: @, Value: 185.199.108.153
     - Type: A, Name: @, Value: 185.199.109.153
     - Type: A, Name: @, Value: 185.199.110.153
     - Type: A, Name: @, Value: 185.199.111.153
     
     **CNAME Record:**
     - Type: CNAME, Name: www, Value: YOUR-USERNAME.github.io
   
   - Save and wait for DNS propagation

5. **Enable HTTPS**
   - In GitHub Pages settings
   - Check "Enforce HTTPS"
   - Done!

---

## Option 3: Vercel (Also Great & Free)

### Why Vercel?
- ✅ Similar to Netlify
- ✅ Excellent performance
- ✅ Free SSL
- ✅ Easy deployment

### Deployment Steps:
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository (or drag-and-drop)
5. Deploy!
6. Add custom domain in settings (same GoDaddy DNS process as Netlify)

---

## Recommended Choice: Netlify

**For V2R Builds, I recommend Netlify because:**
1. Easiest drag-and-drop deployment
2. Works perfectly with your Formspree contact form
3. Automatic HTTPS
4. Great free tier
5. No command line needed

---

## After Deployment Checklist

✅ Test the contact form (make sure emails arrive)
✅ Check all pages load correctly
✅ Verify images display properly
✅ Test on mobile devices
✅ Confirm HTTPS is working
✅ Check all navigation links work
✅ Test form submission and thank-you page

---

## Need Help?

If you run into any issues:
1. Check Netlify/GitHub status pages
2. Verify DNS settings in GoDaddy
3. Wait full 24-48 hours for DNS propagation
4. Clear browser cache and try incognito mode

---

## Updating Your Site

**With Netlify:**
- Drag and drop updated files to redeploy
- Or connect to GitHub for automatic deployments

**With GitHub Pages:**
- Make changes locally
- Run: `git add .`, `git commit -m "Update"`, `git push`
- Site updates automatically

---

## Cost Summary

- **Hosting**: FREE (Netlify/GitHub Pages/Vercel)
- **Domain**: Already paid (GoDaddy)
- **SSL Certificate**: FREE (included)
- **Form Handling**: FREE (Formspree - 50 submissions/month)
- **Total Monthly Cost**: $0 🎉
