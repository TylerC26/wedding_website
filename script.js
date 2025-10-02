// Firebase Configuration
// Replace with your actual Firebase config from Step 3
const firebaseConfig = {
    apiKey: "AIzaSyAFu4fcsIIH-FiOGLG34c_YdhiMKUEr5n4",
    authDomain: "michelle-tyler-wedding.firebaseapp.com",
    projectId: "michelle-tyler-wedding",
    storageBucket: "michelle-tyler-wedding.firebasestorage.app",
    messagingSenderId: "720006903511",
    appId: "1:720006903511:web:03df57c4be58d135552292"
  };
  

// Initialize Firebase (uncomment after adding your config)
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Global variables
let currentImageIndex = 0;
let galleryImages = [];
let uploadedFiles = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize navigation
    initializeNavigation();
    
    // Initialize gallery
    initializeGallery();
    
    // Initialize photo upload
    initializePhotoUpload();
    
    // Initialize RSVP form
    initializeRSVPForm();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll effects
    initializeScrollEffects();
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Gallery functionality with modern collage support
function initializeGallery() {
    const carouselTrack = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.dot');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentSlide = 0;
    const totalSlides = dots.length;

    // Populate gallery images array
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        galleryImages.push({
            src: img.src,
            alt: img.alt,
            title: img.alt
        });

        // Add click event to open lightbox
        slide.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Carousel navigation functions
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play carousel
    setInterval(nextSlide, 4000);

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only trigger if horizontal swipe is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });


    // Enhanced Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function() {
        navigateLightbox(-1);
    });
    lightboxNext.addEventListener('click', function() {
        navigateLightbox(1);
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
                case ' ':
                    e.preventDefault();
                    navigateLightbox(1);
                    break;
            }
        }
    });

    // Enhanced touch/swipe support for mobile
    let lightboxStartX = 0;
    let lightboxEndX = 0;
    let lightboxStartY = 0;
    let lightboxEndY = 0;

    lightbox.addEventListener('touchstart', function(e) {
        lightboxStartX = e.touches[0].clientX;
        lightboxStartY = e.touches[0].clientY;
    });

    lightbox.addEventListener('touchend', function(e) {
        lightboxEndX = e.changedTouches[0].clientX;
        lightboxEndY = e.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diffX = lightboxStartX - lightboxEndX;
        const diffY = lightboxStartY - lightboxEndY;

        // Only handle horizontal swipes if they're more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                navigateLightbox(1); // Swipe left - next image
            } else {
                navigateLightbox(-1); // Swipe right - previous image
            }
        }
    }

    // Add image loading animation for carousel slides
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image failed to load';
        });
    });

    // Lazy loading enhancement for carousel
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    currentImageIndex = index;
    const currentImage = galleryImages[index];
    
    // Fade in lightbox
    lightbox.style.display = 'flex';
    lightbox.style.opacity = '0';
    
    // Load image with fade effect
    lightboxImg.src = currentImage.src;
    lightboxImg.alt = currentImage.alt;
    lightboxImg.title = currentImage.title;
    
    // Fade in effect
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    // Add image info to lightbox if needed
    updateLightboxInfo(currentImage);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Fade out effect
    lightbox.style.opacity = '0';
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const currentImage = galleryImages[currentImageIndex];
    
    // Fade out current image
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        lightboxImg.title = currentImage.title;
        lightboxImg.style.opacity = '1';
        updateLightboxInfo(currentImage);
    }, 150);
}

function updateLightboxInfo(image) {
    // Add image counter and title if desired
    const lightbox = document.getElementById('lightbox');
    
    // Remove existing info if any
    const existingInfo = lightbox.querySelector('.lightbox-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Create info element
    const info = document.createElement('div');
    info.className = 'lightbox-info';
    info.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        text-align: center;
        backdrop-filter: blur(10px);
    `;
    
    info.innerHTML = `
        <div style="font-size: 0.9rem; opacity: 0.9;">
            ${currentImageIndex + 1} / ${galleryImages.length}
        </div>
    `;
    
    lightbox.appendChild(info);
}

// Photo Upload functionality
function initializePhotoUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadedPhotos = document.getElementById('uploaded-photos');
    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const selectedPhotosPreview = document.getElementById('selected-photos-preview');
    const selectedPhotosGrid = document.getElementById('selected-photos-grid');
    const confirmUploadBtn = document.getElementById('confirm-upload');
    const cancelUploadBtn = document.getElementById('cancel-upload');

    let selectedFiles = [];

    // Click to upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        handleFileSelection(files);
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        handleFileSelection(files);
    });

    // Confirm upload button
    confirmUploadBtn.addEventListener('click', function() {
        if (selectedFiles.length > 0) {
            uploadFiles(selectedFiles);
            hideSelectionPreview();
        }
    });

    // Cancel upload button
    cancelUploadBtn.addEventListener('click', function() {
        hideSelectionPreview();
    });

    function handleFileSelection(files) {
        const validFiles = files.filter(file => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
            
            if (!isValidType) {
                alert('Please upload only image files (JPG, PNG, GIF)');
                return false;
            }
            
            if (!isValidSize) {
                alert('File size must be less than 10MB');
                return false;
            }
            
            return true;
        });

        if (validFiles.length === 0) return;

        selectedFiles = validFiles;
        showSelectionPreview(validFiles);
    }

    function showSelectionPreview(files) {
        selectedPhotosGrid.innerHTML = '';
        
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoItem = document.createElement('div');
                photoItem.className = 'selected-photo-item';
                
                const fileSize = (file.size / (1024 * 1024)).toFixed(1);
                
                photoItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <div class="selected-photo-info">
                        <div class="selected-photo-name">${file.name}</div>
                        <div class="selected-photo-size">${fileSize} MB</div>
                    </div>
                `;
                
                selectedPhotosGrid.appendChild(photoItem);
            };
            reader.readAsDataURL(file);
        });

        // Update confirm button text with count
        confirmUploadBtn.innerHTML = `<i class="fas fa-upload"></i> Upload ${files.length} Photo${files.length > 1 ? 's' : ''}`;
        
        selectedPhotosPreview.style.display = 'block';
        uploadArea.style.display = 'none';
    }

    function hideSelectionPreview() {
        selectedPhotosPreview.style.display = 'none';
        uploadArea.style.display = 'block';
        selectedFiles = [];
        fileInput.value = ''; // Clear file input
    }

    function uploadFiles(files) {
        uploadProgress.style.display = 'block';
        let completedUploads = 0;
        const totalFiles = files.length;

        files.forEach((file, index) => {
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                createPhotoPreview(e.target.result, file.name);
            };
            reader.readAsDataURL(file);

            // Check if Firebase is initialized
            if (typeof storage !== 'undefined') {
                // Real Firebase upload
                uploadToFirebase(file, (progress) => {
                    const overallProgress = ((completedUploads + progress) / totalFiles) * 100;
                    progressFill.style.width = overallProgress + '%';
                    progressText.textContent = Math.round(overallProgress) + '%';
                }, () => {
                    completedUploads++;
                    if (completedUploads === totalFiles) {
                        setTimeout(() => {
                            uploadProgress.style.display = 'none';
                            progressFill.style.width = '0%';
                            progressText.textContent = '0%';
                            showSuccessMessage('Photos uploaded successfully! They will be moderated before appearing in the gallery.');
                        }, 500);
                    }
                });
            } else {
                // Fallback to simulation if Firebase not set up
                simulateUpload(file, (progress) => {
                    const overallProgress = ((completedUploads + progress) / totalFiles) * 100;
                    progressFill.style.width = overallProgress + '%';
                    progressText.textContent = Math.round(overallProgress) + '%';
                }, () => {
                    completedUploads++;
                    if (completedUploads === totalFiles) {
                        setTimeout(() => {
                            uploadProgress.style.display = 'none';
                            progressFill.style.width = '0%';
                            progressText.textContent = '0%';
                            showSuccessMessage('Photos uploaded successfully! They will be moderated before appearing in the gallery.');
                        }, 500);
                    }
                });
            }
        });
    }

    function createPhotoPreview(src, filename) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'uploaded-photo';
        photoDiv.innerHTML = `
            <img src="${src}" alt="${filename}">
            <div class="upload-success">
                <i class="fas fa-check"></i>
            </div>
        `;
        uploadedPhotos.appendChild(photoDiv);
    }

    function simulateUpload(file, progressCallback, completeCallback) {
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                completeCallback();
            }
            progressCallback(progress);
        }, 200);
    }
}

// RSVP Form functionality
function initializeRSVPForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpModal = document.getElementById('rsvp-modal');
    const modalClose = document.querySelector('.modal-close');
    const guestsSelect = document.getElementById('guests');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitRSVP();
        }
    });

    modalClose.addEventListener('click', function() {
        rsvpModal.style.display = 'none';
    });

    // Close modal when clicking outside
    rsvpModal.addEventListener('click', function(e) {
        if (e.target === rsvpModal) {
            rsvpModal.style.display = 'none';
        }
    });

    // Attendance toggle functionality
    const attendanceToggle = document.getElementById('attendance');
    const sideToggle = document.getElementById('side');
    const sideGroup = document.querySelector('.form-group:nth-of-type(4)'); // Side toggle form group
    const guestCounterGroup = document.querySelector('.form-group:nth-of-type(5)'); // Guest counter form group
    const dietaryGroup = document.querySelector('.form-group:nth-of-type(6)'); // Dietary form group
    const carPlateGroup = document.querySelector('.form-group:nth-of-type(7)'); // Car plate form group
    // Message field is now always visible inside the form (no need to track it)

    attendanceToggle.addEventListener('change', function() {
        if (this.checked) {
            // Show additional questions when "Yes" is selected
            sideGroup.style.display = 'block';
            guestCounterGroup.style.display = 'block';
            dietaryGroup.style.display = 'block';
            carPlateGroup.style.display = 'block';
            // Message group is always visible (outside form)
        } else {
            // Hide additional questions when "No" is selected
            sideGroup.style.display = 'none';
            guestCounterGroup.style.display = 'none';
            dietaryGroup.style.display = 'none';
            carPlateGroup.style.display = 'none';
            // Message group remains visible (outside form)
        }
    });

    // No additional functionality needed for dropdown - it's self-contained
    
    // Initialize form state (hide additional questions by default)
    sideGroup.style.display = 'none';
    guestCounterGroup.style.display = 'none';
    dietaryGroup.style.display = 'none';
    carPlateGroup.style.display = 'none';
    // Message group is always visible (outside form)

    function validateForm() {
        const baseRequiredFields = ['name', 'phone'];
        let isValid = true;

        // Validate base fields
        baseRequiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });

        // Attendance is always valid (both Yes and No are acceptable responses)
        attendanceToggle.style.borderColor = '#e9ecef';

        // Only validate side and guest count if attending (toggle is checked)
        if (attendanceToggle.checked) {
            // Side selection is always valid since both options are valid
            // (Bride = unchecked, Groom = checked)
            
            // Validate guest count
            const guestsSelect = document.getElementById('guests');
            if (!guestsSelect.value) {
                guestsSelect.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                guestsSelect.style.borderColor = '#e9ecef';
            }
        }

        // Phone validation
        const phone = document.getElementById('phone');
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (phone.value && !phonePattern.test(phone.value.replace(/\s/g, ''))) {
            phone.style.borderColor = '#e74c3c';
            isValid = false;
            alert('Please enter a valid phone number');
        }

        return isValid;
    }

    function submitRSVP() {
        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData);
        
        // Convert attendance checkbox to yes/no
        data.attendance = document.getElementById('attendance').checked ? 'Yes' : 'No';
        
        // Only include side and guest count if attending
        if (data.attendance === 'Yes') {
            // Convert side checkbox to Bride/Groom
            data.side = document.getElementById('side').checked ? 'Groom' : 'Bride';
            data.guests = parseInt(data.guests);
        } else {
            // Remove side and guests fields if not attending
            delete data.side;
            delete data.guests;
        }

        // Show loading state
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;

        // Submit to Formspree
        fetch('https://formspree.io/f/mrbyqadg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            rsvpModal.style.display = 'flex';
            
            // Reset form
            rsvpForm.reset();
            // Reset attendance and side toggles
            attendanceToggle.checked = false;
            sideToggle.checked = false;
            // Hide additional questions after form reset
            sideGroup.style.display = 'none';
            guestCounterGroup.style.display = 'none';
            dietaryGroup.style.display = 'none';
            carPlateGroup.style.display = 'none';
            // Message group remains visible (outside form)
            
            console.log('RSVP submitted successfully:', responseData);
        })
        .catch(error => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            console.error('Error submitting RSVP:', error);
            alert('Sorry, there was an error submitting your RSVP. Please try again.');
        });
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in effect
    document.querySelectorAll('.timeline-item, .transportation-card, .carousel-slide').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showSuccessMessage(message) {
    // Create temporary success message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Firebase upload function
function uploadToFirebase(file, progressCallback, completeCallback) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`wedding-photos/${Date.now()}-${file.name}`);
    
    const uploadTask = fileRef.put(file);
    
    uploadTask.on('state_changed',
        // Progress function
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressCallback(progress);
        },
        // Error function
        (error) => {
            console.error('Upload failed:', error);
            showErrorMessage('Upload failed. Please try again.');
        },
        // Complete function
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                completeCallback();
            });
        }
    );
}

// Formspree integration example (uncomment and replace with your Formspree endpoint)
/*
function submitToFormspree(data) {
    return fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}
*/

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
