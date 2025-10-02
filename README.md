# Sarah & Michael Wedding Website

A beautiful, modern, and interactive wedding website built with HTML5, CSS3, and vanilla JavaScript. Features a responsive design, photo gallery, RSVP form, photo upload functionality, and more.

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Photo Gallery**: Lightbox modal with navigation and swipe gestures
- **Wedding Timeline**: Beautiful timeline showing the day's schedule
- **Transportation Details**: Maps, parking info, and shuttle service details
- **Photo Upload**: Guest photo upload with preview and cloud storage integration
- **RSVP Form**: Complete RSVP form with validation and email integration
- **Smooth Animations**: AOS (Animate On Scroll) library for elegant animations
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Lazy loading, minified assets, and fast loading times

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Customize** the content for your wedding (names, dates, locations, etc.)
4. **Deploy** to your preferred hosting service

## 📁 Project Structure

```
wedding-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Images and other assets (create as needed)
```

## 🎨 Customization

### Basic Information
Update the following in `index.html`:

1. **Couple Names**: Replace "Sarah & Michael" throughout the file
2. **Wedding Date**: Update "June 15, 2024" 
3. **Venue Information**: Update venue name and address
4. **Contact Information**: Update email and phone numbers

### Colors and Styling
Modify the color scheme in `styles.css`:

```css
/* Primary color (blush pink) */
#e8b4b8

/* Secondary color (sage green alternative) */
#a8c8a8

/* Text color */
#2c3e50

/* Background colors */
#f8f9fa (light gray)
#ffffff (white)
```

### Images
Replace the placeholder images with your own:

1. **Hero Background**: Update the background image URL in the `.hero` section
2. **Gallery Photos**: Replace Unsplash URLs with your engagement/wedding photos
3. **Favicon**: Add your own favicon.ico file

## 🔧 Backend Integration

### Photo Upload (Firebase)

1. **Create a Firebase project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Storage

2. **Update Firebase config** in `script.js`:
   ```javascript
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "your-app-id"
   };
   ```

3. **Uncomment Firebase code** in `script.js`:
   - Uncomment the Firebase initialization lines
   - Uncomment the `uploadToFirebase` function
   - Replace the `simulateUpload` function with actual Firebase upload

### RSVP Form (Formspree)

1. **Create a Formspree account**:
   - Go to [Formspree](https://formspree.io/)
   - Create a new form
   - Get your form endpoint URL

2. **Update the RSVP form** in `script.js`:
   ```javascript
   function submitRSVP() {
       // Replace with your Formspree endpoint
       fetch('https://formspree.io/f/YOUR_FORM_ID', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
       })
   }
   ```

## 📱 Deployment Options

### Netlify (Recommended)
1. **Drag and drop** your project folder to [Netlify](https://netlify.com)
2. **Or connect your GitHub repository** for automatic deployments
3. **Custom domain**: Add your own domain in Netlify settings

### Vercel
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: Run `vercel` in your project directory
3. **Follow the prompts** to complete deployment

### GitHub Pages
1. **Push your code** to a GitHub repository
2. **Go to repository settings**
3. **Enable GitHub Pages** in the Pages section
4. **Select source branch** (usually `main`)

### Traditional Web Hosting
1. **Upload files** via FTP to your web host
2. **Ensure `index.html`** is in the root directory
3. **Test all functionality** after upload

## 🔒 Security Considerations

### Photo Upload Security
- **File type validation**: Only allow image files
- **File size limits**: Set reasonable size limits (10MB default)
- **Content moderation**: Implement moderation before displaying photos
- **Storage security**: Use Firebase Storage rules to secure uploads

### Form Security
- **Rate limiting**: Implement rate limiting for form submissions
- **Input validation**: Validate all form inputs on both client and server
- **Spam protection**: Use reCAPTCHA or similar spam protection

## 📊 Performance Optimization

### Images
- **Compress images**: Use tools like TinyPNG or ImageOptim
- **WebP format**: Convert images to WebP for better compression
- **Lazy loading**: Images load as they come into view

### Code
- **Minify CSS/JS**: Use tools like UglifyJS and cssnano
- **CDN**: Use CDN for external libraries (Font Awesome, Google Fonts)
- **Caching**: Set appropriate cache headers

## 🎯 SEO Optimization

1. **Meta tags**: Add proper meta descriptions and keywords
2. **Open Graph**: Add Open Graph tags for social media sharing
3. **Schema markup**: Add structured data for events
4. **Sitemap**: Create a sitemap.xml file
5. **Analytics**: Add Google Analytics or similar tracking

## 🛠️ Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Progressive enhancement**: Basic functionality works in older browsers

## 📞 Support

For technical support or customization requests:

1. **Check the documentation** in the code comments
2. **Review browser console** for any JavaScript errors
3. **Test on multiple devices** and browsers
4. **Validate HTML/CSS** using online validators

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Images**: Placeholder images from [Unsplash](https://unsplash.com)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Fonts**: [Google Fonts](https://fonts.google.com)
- **Animations**: [AOS Library](https://michalsnik.github.io/aos/)

---

**Made with ❤️ for your special day!**

For questions or support, please contact the development team or refer to the inline code comments for detailed implementation notes.
