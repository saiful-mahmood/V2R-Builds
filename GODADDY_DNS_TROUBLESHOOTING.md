# 🔍 Finding Hidden DNS Records in GoDaddy

## The Mystery Extra IPs

Your domain is resolving to these extra IPs:
- ❌ 3.33.130.190 (AWS IP)
- ❌ 15.197.148.33 (AWS IP)

These are **AWS (Amazon) IP addresses**, which suggests GoDaddy might have:
- Domain forwarding enabled
- Domain parking enabled
- Hidden DNS settings

---

## 🔎 Step-by-Step: Find and Remove These IPs

### Step 1: Check Domain Forwarding

1. **Log into GoDaddy**
2. Go to **My Products** → **Domains**
3. Click on **v2rbuilds.com**
4. Look for **Forwarding** section (might be in a separate tab)
5. **If you see any forwarding rules → DELETE THEM**

Common locations:
- **Domain Settings** → **Forwarding**
- **Additional Settings** → **Forwarding**
- **Manage** → **Forwarding**

### Step 2: Check Domain Parking

1. In your domain settings
2. Look for **Parked** or **Parking** status
3. **If domain is parked → Disable parking**

### Step 3: Check All DNS Records Carefully

1. Go to **DNS** or **Manage DNS**
2. Scroll through **ALL** records
3. Look for:
   - Any A records with values: 3.33.130.190 or 15.197.148.33
   - Any CNAME records pointing to AWS or other services
   - Any URL redirects

### Step 4: Check for Multiple DNS Record Sets

Sometimes GoDaddy shows records in different sections:

1. **Standard DNS Records** (the main view)
2. **Advanced DNS** (click "Advanced" or "Show Advanced")
3. **Nameservers** (make sure you're using GoDaddy nameservers)

---

## 🎯 What Your DNS Should Look Like

### A Records (for @)
You should have EXACTLY 4 A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

### CNAME Record (for www)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | saiful-mahmood.github.io | 600 |

### What You Should NOT Have
- ❌ Any A records with other IP addresses
- ❌ Any forwarding rules
- ❌ Domain parking enabled
- ❌ CNAME for @ (root domain)

---

## 🔧 Alternative: Use GoDaddy's DNS Template

If you can't find the extra records, try this:

1. **In GoDaddy DNS Management**
2. Look for **"Use a template"** or **"Quick DNS"**
3. Select **"GitHub Pages"** if available
4. Or manually enter the 4 GitHub IPs

---

## 📸 What to Look For (Screenshots Guide)

### In GoDaddy DNS Management, check these tabs/sections:

**Tab 1: DNS Records**
- Look for A records
- Should only see the 4 GitHub IPs

**Tab 2: Forwarding** 
- Should be empty or disabled
- No redirects to other domains

**Tab 3: Nameservers**
- Should use GoDaddy nameservers
- NOT custom nameservers

**Tab 4: Additional Settings**
- Check for domain parking
- Check for any AWS or cloud service connections

---

## 🆘 Can't Find the Records? Try This

### Option A: Delete ALL A Records and Start Fresh

1. **Delete all existing A records** (even the correct GitHub ones)
2. **Wait 5 minutes**
3. **Add back ONLY the 4 GitHub Pages A records:**
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
4. **Save**

### Option B: Contact GoDaddy Support

If you still can't find where the extra IPs are coming from:

1. **Call GoDaddy Support**: 1-480-505-8877
2. **Tell them**: "I need to remove A records pointing to 3.33.130.190 and 15.197.148.33 from v2rbuilds.com"
3. **Ask them to**: 
   - Check for hidden DNS records
   - Check for domain forwarding
   - Ensure only GitHub Pages IPs are configured

### Option C: Use GoDaddy Chat Support

1. Go to: https://www.godaddy.com/help
2. Click **Chat with us**
3. Say: "I need help removing unwanted A records from my DNS"

---

## 🔍 Verify After Changes

After making any changes, verify with:

```bash
# Wait 5 minutes, then run:
nslookup v2rbuilds.com

# Should show ONLY these 6 addresses:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

Or use online tool:
- Go to: https://dnschecker.org/
- Enter: v2rbuilds.com
- Type: A
- Should show only the 4 GitHub IPs

---

## 🎯 Common GoDaddy Hiding Spots

The extra IPs might be in:

1. **Domain Forwarding** (most likely)
2. **Parked Domain Settings**
3. **Advanced DNS Settings**
4. **Legacy DNS Records** (old records not shown in main view)
5. **Third-party Service Integration** (like website builders)

---

## 📋 Troubleshooting Checklist

- [ ] Checked main DNS Records page
- [ ] Checked "Advanced DNS" or "Show Advanced"
- [ ] Checked Domain Forwarding section
- [ ] Checked for Domain Parking
- [ ] Verified Nameservers are GoDaddy's
- [ ] Looked for any AWS/cloud service connections
- [ ] Checked for website builder integrations
- [ ] Tried deleting all A records and re-adding
- [ ] Contacted GoDaddy support if needed

---

## 💡 Quick Test

To confirm the issue is in GoDaddy (not GitHub):

1. Go to: https://github.com/saiful-mahmood/V2R-Builds/settings/pages
2. Temporarily **remove** the custom domain
3. Wait 5 minutes
4. Check if your site works at: https://saiful-mahmood.github.io/V2R-Builds/
5. If yes, the issue is definitely in GoDaddy DNS
6. Re-add the custom domain after fixing DNS

---

## 🎯 Expected Outcome

Once you find and remove the extra IPs:
- ✅ DNS will show only 4 GitHub Pages IPs
- ✅ HTTPS will provision within 10 minutes
- ✅ Site will work at https://v2rbuilds.com
- ✅ Green padlock in browser

---

## 📞 Need More Help?

**GoDaddy Support:**
- Phone: 1-480-505-8877
- Chat: https://www.godaddy.com/help
- Hours: 24/7

**What to tell them:**
"I'm setting up GitHub Pages for v2rbuilds.com and need to remove A records pointing to 3.33.130.190 and 15.197.148.33. I can't find these records in my DNS management panel."

---

## 🔑 Key Point

Those AWS IPs (3.33.130.190 and 15.197.148.33) are likely from:
- **Old GoDaddy website builder**
- **Domain forwarding service**
- **Parked domain service**

Check those areas first! 🎯
