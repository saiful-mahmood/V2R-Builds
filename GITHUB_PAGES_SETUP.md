# 🌐 V2R Builds - GitHub Pages Setup

## ✅ Current Configuration

Your website is now properly configured to serve from the **main branch** only.

### Repository Structure
```
V2R-Builds (Repository)
└── main (branch) ← Your website lives here
    ├── index.html
    ├── style.css
    ├── script.js
    ├── thank-you.html
    ├── images/
    ├── videos/
    ├── CNAME
    └── ... (all other files)
```

### How GitHub Pages Works

1. **Source Location**: Main branch, root directory (`/`)
2. **Live URL**: https://v2rbuilds.com
3. **Deployment**: Automatic on every push to main
4. **Build Time**: 1-2 minutes after push

---

## 🔄 What Changed

### Before
- ❌ Had both `main` and `gh-pages` branches
- ❌ Confusion about which branch serves the site
- ❌ `gh-pages` had outdated code (no mobile optimizations)

### After
- ✅ Only `main` branch exists
- ✅ All website files in main branch root
- ✅ GitHub Pages serves directly from main
- ✅ Latest mobile optimizations are live

---

## 🚀 How to Update Your Live Website

Every time you make changes and push to the main branch, your live site updates automatically:

```bash
# 1. Make your changes to any files (HTML, CSS, JS, etc.)

# 2. Stage the changes
git add .

# 3. Commit with a descriptive message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push origin main

# 5. Wait 1-2 minutes - your site is now live!
```

---

## 🔍 Verify Your Setup

### Check GitHub Pages Settings
1. Go to: https://github.com/saiful-mahmood/V2R-Builds/settings/pages
2. You should see:
   - ✅ **Source**: Deploy from a branch
   - ✅ **Branch**: main
   - ✅ **Folder**: / (root)
   - ✅ **Custom domain**: v2rbuilds.com
   - ✅ **Enforce HTTPS**: Checked
   - ✅ **Status**: "Your site is live at https://v2rbuilds.com"

### Check Your Live Site
- Visit: https://v2rbuilds.com
- You should see the latest version with all mobile optimizations

---

## 📁 File Structure Explanation

All your website files are in the **root of the main branch**:

```
/                           ← Root directory (GitHub Pages serves from here)
├── index.html             ← Homepage
├── style.css              ← Mobile-optimized styles
├── script.js              ← Mobile-optimized JavaScript
├── thank-you.html         ← Form submission thank you page
├── CNAME                  ← Custom domain configuration
├── logo-icon.svg          ← Logo
├── images/                ← Image assets
│   ├── hero.png
│   ├── bathroom.png
│   ├── render.png
│   └── ...
├── videos/                ← Video assets
│   └── hero.mp4
└── Documentation files:
    ├── DEPLOYMENT_GUIDE.md
    ├── CONTACT_FORM_SETUP.md
    ├── MOBILE_OPTIMIZATION_GUIDE.md
    └── MOBILE_QUICK_REFERENCE.md
```

---

## 🎯 Why This Setup is Better

### Advantages of Main Branch Deployment

1. **Simplicity**: One branch to manage
2. **Version Control**: All changes tracked in main
3. **Automatic Deployment**: Push = Live update
4. **No Confusion**: Clear source of truth
5. **Latest Code**: Always serving the most recent version

### No Need for gh-pages Branch

GitHub Pages can deploy from:
- ✅ Main branch root (what you're using) ← **Recommended**
- Main branch /docs folder
- Separate gh-pages branch (legacy approach)

You're using the **modern, recommended approach**: main branch root.

---

## 🔐 Security & Domain

### HTTPS
- ✅ Automatically enabled via GitHub Pages
- ✅ Free SSL certificate from Let's Encrypt
- ✅ All traffic encrypted

### Custom Domain
- ✅ v2rbuilds.com configured via CNAME file
- ✅ DNS points to GitHub Pages servers
- ✅ Automatic HTTPS for custom domain

---

## 📊 Deployment Workflow

```
Local Changes
    ↓
git add .
    ↓
git commit -m "message"
    ↓
git push origin main
    ↓
GitHub receives push
    ↓
GitHub Pages builds site (1-2 min)
    ↓
Live site updated at v2rbuilds.com
```

---

## 🛠️ Troubleshooting

### Site not updating after push?
1. Check GitHub Actions tab for build status
2. Wait full 2 minutes
3. Clear browser cache (Ctrl+Shift+R)
4. Try incognito mode

### Want to see build status?
- Go to: https://github.com/saiful-mahmood/V2R-Builds/actions
- Check latest workflow run

### Need to verify DNS?
```bash
# Check if domain points to GitHub
dig v2rbuilds.com +short

# Should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

---

## 📝 Quick Reference

| Setting | Value |
|---------|-------|
| **Repository** | saiful-mahmood/V2R-Builds |
| **Branch** | main |
| **Source Folder** | / (root) |
| **Live URL** | https://v2rbuilds.com |
| **GitHub URL** | https://saiful-mahmood.github.io/V2R-Builds/ |
| **Deploy Method** | Automatic on push |
| **Build Time** | 1-2 minutes |
| **HTTPS** | Enabled |
| **Custom Domain** | v2rbuilds.com |

---

## ✨ Summary

Your V2R Builds website is now:
- ✅ Serving from the **main branch root directory**
- ✅ No separate gh-pages branch needed
- ✅ Automatically deploys on every push
- ✅ Mobile-optimized code is live
- ✅ Custom domain configured
- ✅ HTTPS enabled

**To update your site**: Just push to main, and it goes live automatically! 🚀
