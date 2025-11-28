# Privacy Audit - Wedding Website

## Information Currently Visible in Browser/Code

### ✅ PUBLICLY VISIBLE (Intended for Wedding Guests)
1. **Names**: Michelle & Tyler - Visible throughout site
2. **Email Address**: `michelletyler2267@gmail.com` - In footer (line 569)
3. **Phone Numbers**:
   - Tyler: 60924199 (footer, line 570)
   - Michelle: 55314534 (footer, line 571)
4. **Wedding Date**: January 2026
5. **Personal Story**: Love story with personal details (quarantine story, proposal at Niagara Falls, etc.)
6. **Venue Locations**: 
   - Béthanie Chapel
   - Harbour Grand Hong Kong, North Point
   - Aberdeen Marina Club

### ⚠️ TECHNICAL CONCERNS

#### 1. Firebase Configuration (script.js lines 3-10)
**EXPOSED:**
- API Key: `AIzaSyAFu4fcsIIH-FiOGLG34c_YdhiMKUEr5n4`
- Project ID: `michelle-tyler-wedding`
- Storage Bucket: `michelle-tyler-wedding.firebasestorage.app`
- Auth Domain: `michelle-tyler-wedding.firebaseapp.com`

**RISK LEVEL: LOW to MODERATE**
- Firebase API keys are **designed** to be public (used in client-side code)
- However, security depends on Firebase Security Rules
- Without proper rules, someone could:
  - Upload files to your Firebase Storage
  - Access your Firebase project resources
  - Potentially incur costs

**RECOMMENDATION:**
- ✅ Ensure Firebase Storage Security Rules are properly configured (see FIREBASE_SETUP.md)
- ✅ Set up domain restrictions in Firebase Console (restrict API key to your domain only)
- ✅ Monitor Firebase Storage usage regularly

#### 2. Formspree Endpoint (script.js line 1164)
**EXPOSED:**
- Endpoint: `https://formspree.io/f/mrbyqadg`

**RISK LEVEL: LOW**
- Formspree endpoints are meant to be public
- You should enable spam protection in Formspree settings
- Consider rate limiting if available

### 📋 SUMMARY

**What will be visible to anyone who visits your site:**
1. Your full names (Michelle & Tyler)
2. Email address
3. Phone numbers
4. Personal love story
5. Wedding date and location details
6. All the code including Firebase config and API endpoints

**Recommendations before publishing:**

1. **Review if you want phone numbers public**
   - Consider if you want these accessible to anyone
   - You could use a contact form instead, or only show to authenticated guests

2. **Verify Firebase Security Rules**
   - Check that Storage rules restrict unauthorized uploads
   - Enable domain restrictions for API key

3. **Consider making site private**
   - Add password protection if you don't want the general public to access it
   - Or use guest authentication

4. **Review personal story content**
   - Ensure you're comfortable with all details being public
   - Story mentions "T" and "M" but full names are elsewhere

5. **Email address exposure**
   - Consider using a separate wedding email if concerned about spam
   - The current email appears to be your real email address

## Next Steps

Would you like me to:
1. Set up password protection for the site?
2. Review/update Firebase Security Rules?
3. Create a contact form to hide phone numbers?
4. Set up domain restrictions for Firebase API key?

