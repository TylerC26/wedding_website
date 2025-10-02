# 📧 Formspree Setup Guide for RSVP Form

## Overview
Formspree is the easiest way to handle your wedding RSVP form submissions. It's free, reliable, and requires minimal setup.

## Step 1: Create Formspree Account

1. **Go to Formspree**: Visit [https://formspree.io](https://formspree.io)
2. **Sign up**: Click "Get Started" and create a free account
3. **Verify email**: Check your inbox and click the verification link

## Step 2: Create New Form

1. **Login** to your Formspree dashboard
2. **Click "New Form"**
3. **Form settings**:
   - **Name**: "Michelle & Tyler Wedding RSVP"
   - **Email**: Your email address (where RSVPs will be sent)
   - **Subject**: "Wedding RSVP from {name}"
4. **Click "Create Form"**

## Step 3: Get Your Form Endpoint

After creating the form, you'll get a form endpoint that looks like:
```
https://formspree.io/f/YOUR_FORM_ID
```

**Copy this URL** - you'll need it for the next step.

## Step 4: Update Your Website Code

1. **Open** `script.js` file
2. **Find** the `submitRSVP()` function (around line 602)
3. **Replace** the simulation code with:

```javascript
function submitRSVP() {
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;

    // Submit to Formspree
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        rsvpModal.style.display = 'flex';
        
        // Reset form
        rsvpForm.reset();
        
        console.log('RSVP submitted successfully:', data);
    })
    .catch(error => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.error('Error submitting RSVP:', error);
        alert('Sorry, there was an error submitting your RSVP. Please try again.');
    });
}
```

4. **Replace** `YOUR_FORM_ID` with your actual Formspree form ID

## Step 5: Test Your Form

1. **Save** your changes
2. **Restart** your local server
3. **Go to** your wedding website
4. **Fill out** the RSVP form and submit
5. **Check** your email for the RSVP notification

## Step 6: View RSVP Submissions

1. **Go to** your Formspree dashboard
2. **Click** on your form
3. **View submissions** in real-time
4. **Export data** as CSV if needed

## Formspree Features You'll Love

### 📧 Email Notifications
- Get instant email when someone RSVPs
- Customizable email templates
- Include all form data in the email

### 📊 Submission Management
- View all RSVPs in dashboard
- Export to CSV/Excel
- Filter and search submissions

### 🛡️ Spam Protection
- Built-in spam filtering
- reCAPTCHA integration (optional)
- Block suspicious submissions

### 📱 Mobile Friendly
- Works perfectly on all devices
- No additional setup needed

## Pricing

### Free Tier (Perfect for Weddings)
- ✅ **50 submissions/month**
- ✅ **Email notifications**
- ✅ **Basic spam protection**
- ✅ **Dashboard access**

### Paid Plans (If you need more)
- **Starter**: $10/month - 1,000 submissions
- **Pro**: $20/month - 5,000 submissions

## Troubleshooting

### Form not submitting?
- Check browser console (F12) for errors
- Verify your Formspree endpoint URL
- Make sure you're using the correct form ID

### Not receiving emails?
- Check spam folder
- Verify email address in Formspree settings
- Check Formspree dashboard for submissions

### Getting spam submissions?
- Enable reCAPTCHA in Formspree settings
- Use Formspree's spam filtering features

## Current Status
✅ RSVP form is ready in your HTML  
✅ JavaScript validation is working  
✅ Success modal is implemented  
⏳ **Next**: Add your Formspree endpoint and test

## Support
- **Formspree Docs**: [help.formspree.io](https://help.formspree.io)
- **Contact Formspree**: [support@formspree.io](mailto:support@formspree.io)

---

**Note**: Your RSVP form currently works in "simulation mode" until you complete the Formspree setup. Once configured, it will send real emails to your inbox!
