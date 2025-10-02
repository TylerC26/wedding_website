# 🔥 Firebase Setup Guide for Photo Uploader

## Overview
This guide will walk you through setting up Firebase Storage to enable real photo uploads for your wedding website's photo uploader feature.

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: Visit [https://console.firebase.google.com](https://console.firebase.google.com)
2. **Sign in** with your Google account
3. **Click "Create a project"**
4. **Enter project name**: e.g., "michelle-tyler-wedding"
5. **Disable Google Analytics** (optional for this project)
6. **Click "Create project"**

## Step 2: Enable Firebase Storage

1. In your Firebase project dashboard, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select a **storage location** closest to your users (e.g., `asia-southeast1` for Hong Kong)
5. Click **"Done"**

## Step 3: Get Firebase Configuration

1. Click the **⚙️ gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → **Web app** (🌐 icon)
4. **Register your app**:
   - App nickname: "Wedding Website"
   - Check "Also set up Firebase Hosting" (optional)
5. **Copy the Firebase config object** that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

## Step 4: Update Your Website Code

1. **Open** `script.js` file
2. **Find** the `firebaseConfig` object (around line 3-10)
3. **Replace** the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...", // Your actual API key
    authDomain: "your-project.firebaseapp.com", // Your actual domain
    projectId: "your-project-id", // Your actual project ID
    storageBucket: "your-project.appspot.com", // Your actual storage bucket
    messagingSenderId: "123456789", // Your actual sender ID
    appId: "your-app-id" // Your actual app ID
};
```

4. **Uncomment** these lines (remove the `//`):

```javascript
// Change this:
// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

// To this:
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
```

## Step 5: Test the Upload

1. **Save** your changes
2. **Restart** your local server
3. **Open** your website in a browser
4. **Go to** the Photo Uploader section
5. **Try uploading** a test photo
6. **Check** your Firebase Storage console to see if the photo appears

## Step 6: Security Rules (Important!)

After testing, you should secure your Firebase Storage:

1. Go to **Firebase Console** → **Storage** → **Rules**
2. **Replace** the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow uploads to wedding-photos folder with size and type restrictions
    match /wedding-photos/{allPaths=**} {
      allow write: if request.resource.size < 10 * 1024 * 1024  // 10MB limit
                   && request.resource.contentType.matches('image/.*');  // Images only
      allow read: if true;  // Allow public read access
    }
  }
}
```

3. **Click "Publish"**

## Step 7: View Uploaded Photos

1. Go to **Firebase Console** → **Storage**
2. Click on **"Files"** tab
3. Navigate to **`wedding-photos/`** folder
4. You'll see all uploaded photos with timestamps

## Troubleshooting

### Photos not uploading?
- Check browser console for errors (F12 → Console)
- Verify Firebase config is correct
- Ensure Storage is enabled in Firebase Console

### "Permission denied" errors?
- Check Storage security rules
- Make sure you're in "test mode" initially

### Photos not appearing in gallery?
- This is normal! Photos need manual moderation
- Check Firebase Storage console to see uploaded files

## Current Status
✅ Firebase SDK is already included in your HTML  
✅ Upload interface is ready  
✅ Code is prepared for Firebase integration  
⏳ **Next**: Add your Firebase config and uncomment the initialization lines

## Support
If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify all Firebase config values are correct
3. Ensure Storage is properly enabled in Firebase Console

---

**Note**: The photo uploader currently works in "simulation mode" until you complete the Firebase setup. Once configured, it will upload photos to your Firebase Storage bucket.
