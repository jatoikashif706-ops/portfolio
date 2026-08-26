# Email Contact Form Setup Guide

Complete guide for setting up the Resend email service for your portfolio contact form.

---

## 📧 Overview

Your portfolio uses [Resend](https://resend.com) to send emails from the contact form. This guide covers:
- Local development setup
- Production deployment (Vercel)
- Testing the contact form
- Troubleshooting common issues

---

## 🚀 Quick Start

### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

**Free Tier Includes:**
- 100 emails/day
- 3,000 emails/month
- Perfect for portfolio contact forms

---

### Step 2: Create an API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Select permissions: **Full Access** or **Sending Access**
6. Copy your API key (starts with `re_`)

⚠️ **Important:** Save your API key immediately - you won't be able to see it again!

**Example API Key Format:**
```
re_123456789abcdefghijklmnopqrstuvwxyz
```

---

### Step 3: Local Development Setup

**Your .env.local file is already configured:**

```env
# Resend API Configuration
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_RECIPIENT_EMAIL=jatoikashif706@gmail.com
```

✅ **Status:** Local development ready to send emails!

**To update the API key:**
1. Open `.env.local` in your project root
2. Replace `RESEND_API_KEY` with your new key
3. Restart your dev server: `npm run dev`

---

## 🌐 Production Setup (Vercel)

### Add Environment Variables to Vercel

1. Go to [vercel.com](https://vercel.com/kashif-qurban)
2. Select your portfolio project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

#### Variable 1: RESEND_API_KEY
```
Name:  RESEND_API_KEY
Value: re_your_actual_api_key_here
Environment: Production, Preview, Development
```

#### Variable 2: CONTACT_RECIPIENT_EMAIL
```
Name:  CONTACT_RECIPIENT_EMAIL
Value: jatoikashif706@gmail.com
Environment: Production, Preview, Development
```

5. Click **Save**
6. Redeploy your project for changes to take effect

---

## 📨 Email Configuration

### Current Email Settings

**From Address:**
```
Portfolio Contact Form <onboarding@resend.dev>
```

⚠️ **Note:** `onboarding@resend.dev` is for testing only. For production, verify your own domain.

### Verify Your Custom Domain (Recommended)

**Why verify a custom domain?**
- Better deliverability
- Professional sender address
- Avoid spam filters
- Branded emails

**How to verify:**
1. Go to Resend dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `kashifqurban.dev`)
4. Add the provided DNS records to your domain provider
5. Wait for verification (usually 5-60 minutes)
6. Update `from` address in `src/app/api/send/route.ts`:

```typescript
from: "Portfolio Contact <contact@yourdomain.com>",
```

---

## 🧪 Testing the Contact Form

### Local Testing (Development)

1. Start dev server: `npm run dev`
2. Open `http://localhost:3000`
3. Scroll to Contact section
4. Fill out the form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Message:** This is a test message
5. Click **Send Message**

**Expected Result:**
- ✅ Form submits successfully
- ✅ "Message Sent!" confirmation appears
- 📧 Email arrives at `jatoikashif706@gmail.com`
- ⏱️ Email should arrive within 1-2 seconds

### Check Email Delivery

**In Resend Dashboard:**
1. Go to **Emails** section
2. See all sent emails with status
3. Click on an email to view:
   - Delivery status
   - Open/click tracking
   - Raw email content
   - Delivery logs

**Delivery Statuses:**
- ✅ **Delivered** - Email successfully sent
- ⏳ **Pending** - Email being sent
- ❌ **Bounced** - Email address invalid
- ⚠️ **Complained** - Marked as spam (rare)

---

## 📧 Email Template

### Current HTML Template

The contact form sends a formatted HTML email with:
- Professional styling
- Sender information (name + email)
- Reply-to header (allows one-click reply)
- Formatted message content
- Preserves line breaks and formatting

### Email Preview

```html
Subject: New Portfolio Message from [Name]
From: Portfolio Contact Form <onboarding@resend.dev>
Reply-To: [Sender's Email]

┌─────────────────────────────────────┐
│ New Contact Form Submission          │
├─────────────────────────────────────┤
│ Name: John Doe                       │
│ Email: john@example.com              │
├─────────────────────────────────────┤
│ Message:                             │
│ Hi, I'd like to discuss a project... │
└─────────────────────────────────────┘
```

### Customize Email Template

Edit `src/app/api/send/route.ts`:

```typescript
html: `
  <div style="font-family: sans-serif; max-width: 600px;">
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  </div>
`
```

---

## 🔍 Troubleshooting

### Issue: "Email service not configured in development"

**Cause:** API key missing or invalid in `.env.local`

**Fix:**
1. Check `.env.local` exists in project root
2. Verify `RESEND_API_KEY` is set correctly
3. Restart dev server: Stop (Ctrl+C) → `npm run dev`
4. Check console for errors

---

### Issue: "Server configuration missing recipient email"

**Cause:** `CONTACT_RECIPIENT_EMAIL` not set

**Fix:**
1. Add to `.env.local`:
   ```env
   CONTACT_RECIPIENT_EMAIL=jatoikashif706@gmail.com
   ```
2. Restart dev server
3. In Vercel: Add environment variable in dashboard

---

### Issue: Email not arriving

**Possible Causes & Fixes:**

1. **Check Spam Folder**
   - Resend emails may land in spam initially
   - Mark as "Not Spam" to train filters

2. **Verify API Key**
   - Log in to Resend dashboard
   - Check API key is active and not expired
   - Generate new key if needed

3. **Check Resend Dashboard**
   - Go to **Emails** section
   - Check delivery status
   - Look for error messages

4. **Email Address Issues**
   - Verify recipient email is correct
   - Check for typos in `.env.local`
   - Try different recipient address

5. **Rate Limits**
   - Free tier: 100 emails/day
   - Check if limit reached in dashboard

---

### Issue: "Error 500" when submitting form

**Debugging Steps:**

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for API response details

2. **Check Server Logs:**
   ```bash
   # Development
   npm run dev
   # Look for console.error output
   ```

3. **Verify Environment Variables:**
   ```bash
   # Check if vars are loaded
   echo $RESEND_API_KEY  # Should show your key
   ```

4. **Test API Key:**
   - Log in to Resend
   - Try sending test email from dashboard
   - If dashboard works, API key is valid

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Use environment variables for sensitive data
- Regenerate API keys if exposed
- Set up domain verification for production
- Monitor email usage in Resend dashboard

### ❌ DON'T:
- Commit `.env.local` to GitHub
- Share API keys publicly
- Use test domain in production (`onboarding@resend.dev`)
- Send API keys in plain text messages
- Use same API key for multiple projects

---

## 📊 Monitoring & Analytics

### Resend Dashboard Metrics

**Available Analytics:**
- Total emails sent (daily/monthly)
- Delivery rate (%)
- Open rate (if tracking enabled)
- Click rate (if tracking enabled)
- Bounce rate
- Spam complaint rate

**Access Analytics:**
1. Log in to Resend dashboard
2. Navigate to **Analytics** section
3. View metrics by date range
4. Export data as CSV

---

## 🆘 Support Resources

### Resend Documentation
- [Getting Started](https://resend.com/docs/getting-started)
- [API Reference](https://resend.com/docs/api-reference)
- [Domain Verification](https://resend.com/docs/domains/introduction)
- [Email Best Practices](https://resend.com/docs/best-practices)

### Portfolio Support
- GitHub Issues: [jatoikashif706-ops/portfolio](https://github.com/jatoikashif706-ops/portfolio/issues)
- Email: jatoikashif706@gmail.com

### Resend Support
- Email: support@resend.com
- Response time: 24-48 hours

---

## 📝 Quick Reference

### Environment Variables
```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_RECIPIENT_EMAIL=jatoikashif706@gmail.com
```

### API Endpoint
```
POST /api/send
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

### Success Response
```json
{
  "success": true,
  "id": "email_id_from_resend"
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

---

## ✅ Checklist

Before deploying to production:

- [ ] Resend account created
- [ ] API key generated and saved
- [ ] `.env.local` configured locally
- [ ] Local testing successful (email received)
- [ ] Environment variables added to Vercel
- [ ] Production deployment completed
- [ ] Production testing successful
- [ ] Custom domain verified (optional but recommended)
- [ ] Spam folder checked
- [ ] Reply functionality tested

---

## 🎉 All Set!

Your contact form is now fully configured and ready to receive messages!

**Current Status:**
- ✅ Resend SDK installed
- ✅ API route configured
- ✅ Environment variables set
- ✅ Ready for production deployment

**Next Steps:**
1. Deploy to Vercel: https://vercel.com/kashif-qurban
2. Add environment variables in Vercel dashboard
3. Test the live contact form
4. Monitor emails in Resend dashboard

---

*Last Updated: 2026-08-23*
*Resend SDK Version: 6.22.1*
*Next.js Version: 16.3.2*
