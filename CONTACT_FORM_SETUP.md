# V2R Builds - Contact Form Setup Instructions

## Email Configuration

The contact form is configured to send emails to:
- contact@primecleancare.com (primary recipient)
- nussharif2020@gmail.com (CC)
- saifulmahmood@gmail.com (CC)

## Setup Steps

### 1. Create Formspree Account
1. Go to https://formspree.io/
2. Sign up for a free account using **contact@primecleancare.com**
3. Verify your email address

### 2. Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Name it "V2R Builds Contact Form"
3. Copy the form endpoint URL (it will look like: `https://formspree.io/f/xyzabc123`)

### 3. Update the Website
1. Open `index.html`
2. Find line 253: `<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
4. Save the file

### 4. Configure Form Settings (in Formspree Dashboard)
1. Go to your form settings
2. Under "Email Notifications":
   - Primary email is already set to contact@primecleancare.com
   - The CC emails (nussharif2020@gmail.com, saifulmahmood@gmail.com) are configured via the hidden `_cc` field in the form

### 5. Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check all three email addresses for the submission

## Form Fields Included
- Name (required)
- Email (required)
- Phone (optional)
- Project Type (required dropdown)
- Message/Project Description (optional textarea)

## Features
- ✅ Sends to 3 email addresses simultaneously
- ✅ Custom subject line: "New V2R Builds Contact Form Submission"
- ✅ Redirects to thank-you.html after submission
- ✅ Professional thank you page with animated checkmark
- ✅ Mobile responsive
- ✅ Spam protection included with Formspree

## Alternative: Use EmailJS (if you prefer)
If you want more control, you can use EmailJS instead:
1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Create an email template
4. Update the form to use EmailJS JavaScript SDK

## Notes
- Formspree free tier allows 50 submissions/month
- Upgrade to paid plan if you need more
- All submissions are stored in your Formspree dashboard
- You can export submissions as CSV
