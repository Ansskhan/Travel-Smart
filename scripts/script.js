// ========================
// Header Section Start
// ======================
// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        // Toggle mobile menu when button is clicked
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when a link is clicked (for mobile view)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: ${query}`);
                // In a real application, you would redirect to search results
                // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        };

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Language and Currency Selectors
    const languageSelect = document.getElementById('language');
    const currencySelect = document.getElementById('currency');

    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            console.log('Language changed to:', this.value);
        });
    }

    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            console.log('Currency changed to:', this.value);
        });
    }

    // Ensure auth buttons are visible (fix for some mobile browsers)
    function checkAuthButtons() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkAuthButtons);
    checkAuthButtons();
});

// ==================
// FOOTER Start Here 
// ================
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form
    const newsletterForm = document.getElementById('travel-newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                emailInput.focus();
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            alert('Thank you for subscribing to our travel newsletter! You will receive our best deals and tips soon.');
            this.reset();
        });
    }
    
    // Book Now Button
    const bookNowBtn = document.querySelector('.btn-travel-primary');
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            alert("✈️ Let's book your adventure!\n\nYou'll be redirected to our booking system...");
            // window.location.href = '/book-now';
        });
    }
    
    // Contact Button
    const contactBtn = document.querySelector('.btn-travel-contact');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert("📞 Need help with your travel plans?\n\nOur customer service team is available 24/7 to assist you!");
            // window.location.href = '/contact';
        });
    }
    
    // Smooth scrolling for footer links
    document.querySelectorAll('.travel-footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ======================
// Hero section JS Start 
// ====================
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let timer;
    let isMobile = window.innerWidth <= 480;
    let slideInterval = isMobile ? 7000 : 5000; // Longer interval for mobile

    // Function to show slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Next slide function
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    // Previous slide function
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        showSlide(newIndex);
    }

    // Auto slide change
    function startSlider() {
        clearInterval(timer); // Clear existing timer
        timer = setInterval(nextSlide, slideInterval);
    }

    // Stop auto sliding when mouse is over slider
    const slider = document.querySelector('.slider-container');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(timer);
        });

        slider.addEventListener('mouseleave', startSlider);
    }

    // Click events for arrows
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Handle window resize
    function handleResize() {
        isMobile = window.innerWidth <= 480;
        slideInterval = isMobile ? 7000 : 5000;
        startSlider();
    }

    window.addEventListener('resize', handleResize);

    // Initialize slider
    showSlide(0);
    startSlider();
});

// ==================================
// Popular Destinations Section Start 
// =================================
document.addEventListener('DOMContentLoaded', function() {
    // Get all Explore buttons
    const exploreButtons = document.querySelectorAll('.view-details');

    // Add click event to each Explore button
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            // Get position of click
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position the ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
            
            const card = this.closest('.destination-card');
            if (!card) return;
            
            const destinationName = card.querySelector('h2')?.textContent;
            if (!destinationName) return;

            // Add animation before redirecting
            card.style.animation = 'cardClick 0.6s ease-out forwards';
            
            setTimeout(() => {
                // You can replace this with your actual navigation logic
                alert(`Exploring ${destinationName}! This would typically redirect to a detailed page.`);

                // Alternatively, you could navigate to a details page:
                // window.location.href = `/destinations/${destinationName.toLowerCase().replace(', ', '-')}`;
                
                // Reset animation
                card.style.animation = '';
            }, 600);
        });
    });

    // View All Destinations button functionality
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'destinations.html';
        });
    }   

    // Add intersection observer for scroll animations
    const cards = document.querySelectorAll('.destination-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add styles for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
    
    .loading-dots span {
        animation: dotPulse 1.4s infinite ease-in-out;
        opacity: 0;
    }
    
    .loading-dots span:nth-child(1) {
        animation-delay: 0.2s;
    }
    
    .loading-dots span:nth-child(2) {
        animation-delay: 0.4s;
    }
    
    .loading-dots span:nth-child(3) {
        animation-delay: 0.6s;
    }
    
    @keyframes dotPulse {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    
    @keyframes cardClick {
        0% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        50% {
            transform: scale(0.95);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    }
`;
document.head.appendChild(style);

// ======================================= 
// Special Offers Section JavaScript Start
// ======================================
document.addEventListener("DOMContentLoaded", function() {
    // Countdown Timer Functionality
    function updateCountdown() {
        // Set the date we're counting down to (3 days from now)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        countdownDate.setHours(23, 59, 59, 0); // Set to end of day

        // Update the countdown every 1 second
        const countdownTimer = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the countdown date
            const distance = countdownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result
            const daysElement = document.getElementById("days");
            const hoursElement = document.getElementById("hours");
            const minutesElement = document.getElementById("minutes");
            const secondsElement = document.getElementById("seconds");
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, "0");
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, "0");
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, "0");
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, "0");

            // If the countdown is finished, clear interval
            if (distance < 0) {
                clearInterval(countdownTimer);
                const countdownElement = document.querySelector(".countdown-timer");
                if (countdownElement) {
                    countdownElement.innerHTML = `
                        <div class="expired-message">
                            <i class="fas fa-clock"></i>
                            <span>Offer Expired!</span>
                        </div>
                    `;
                    countdownElement.style.animation = "shake 0.5s";
                }
            }
        }, 1000);
    }

    // Book Now Button Functionality
    function setupBookButtons() {
        const bookButtons = document.querySelectorAll(".book-now-btn");

        bookButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                // Create ripple effect
                const ripple = document.createElement("span");
                ripple.classList.add("ripple-effect");
                this.appendChild(ripple);
                
                // Get click position
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Position ripple
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
                
                const packageCard = this.closest(".package-card");
                if (!packageCard) return;
                
                const packageName = packageCard.querySelector("h3")?.textContent;
                const discountedPriceElement = packageCard.querySelector(".discounted-price");
                const discountedPrice = discountedPriceElement?.textContent;

                if (!packageName || !discountedPrice) return;

                // Add click animation
                packageCard.style.animation = "cardClick 0.6s ease-out forwards";
                
                setTimeout(() => {
                    // You can choose to keep the alert or remove it
                    alert(`You've selected the ${packageName} package for ${discountedPrice}! Redirecting to booking page...`);
                    
                    // Reset animation
                    packageCard.style.animation = "";
                }, 600);
            });
        });
    }

    // Initialize all functionality
    updateCountdown();
    setupBookButtons();

    // Add intersection observer for scroll animations
    const cards = document.querySelectorAll('.package-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Add styles for dynamic elements
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        }
        
        .expired-message {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #fff;
            padding: 10px;
        }
        
        .expired-message i {
            color: #e74c3c;
            font-size: 1.5rem;
        }
    `;
    document.head.appendChild(style);
});

// =========================
//    TESTIMONIALS JS Start
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialsItems = document.querySelectorAll('.testimonials-carousel .carousel-item');
    const testimonialsPrevBtn = document.querySelector('.testimonials-prev');
    const testimonialsNextBtn = document.querySelector('.testimonials-next');

    if (testimonialsCarousel && testimonialsItems.length > 0) {
        let testimonialsCurrentIndex = 0;
        let testimonialsItemsPerSlide = getItemsPerSlide();
        const testimonialsTotalItems = testimonialsItems.length;
        const testimonialsWrapper = testimonialsCarousel.parentElement;

        function getItemsPerSlide() {
            const width = window.innerWidth;
            if (width <= 576) return 1;
            if (width <= 992) return 2;
            return 3;
        }

        function updateTestimonialsCarousel() {
            const itemWidth = testimonialsItems[0].offsetWidth + 30;
            const maxIndex = Math.max(0, testimonialsTotalItems - testimonialsItemsPerSlide);
            testimonialsCurrentIndex = Math.min(testimonialsCurrentIndex, maxIndex);

            const newPosition = -testimonialsCurrentIndex * itemWidth;
            testimonialsCarousel.style.transform = `translateX(${newPosition}px)`;
        }

        function testimonialsNextSlide() {
            const maxIndex = Math.max(0, testimonialsTotalItems - testimonialsItemsPerSlide);
            if (testimonialsCurrentIndex < maxIndex) {
                testimonialsCurrentIndex++;
            } else {
                testimonialsCurrentIndex = 0;
            }
            updateTestimonialsCarousel();
        }

        function testimonialsPrevSlide() {
            if (testimonialsCurrentIndex > 0) {
                testimonialsCurrentIndex--;
            } else {
                const maxIndex = Math.max(0, testimonialsTotalItems - testimonialsItemsPerSlide);
                testimonialsCurrentIndex = maxIndex;
            }
            updateTestimonialsCarousel();
        }

        window.addEventListener('resize', () => {
            testimonialsItemsPerSlide = getItemsPerSlide();
            updateTestimonialsCarousel();
        });

        if (testimonialsNextBtn) testimonialsNextBtn.addEventListener('click', testimonialsNextSlide);
        if (testimonialsPrevBtn) testimonialsPrevBtn.addEventListener('click', testimonialsPrevSlide);

        let testimonialsAutoRotate = setInterval(testimonialsNextSlide, 5000);

        if (testimonialsWrapper) {
            testimonialsWrapper.addEventListener('mouseenter', () => clearInterval(testimonialsAutoRotate));
            testimonialsWrapper.addEventListener('mouseleave', () => {
                testimonialsAutoRotate = setInterval(testimonialsNextSlide, 5000);
            });
        }

        // Animate cards on load
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * index);
        });

        updateTestimonialsCarousel();
    }
});

// =========================
// TRAVEL BLOG INTERACTIVITY
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Get all article cards
    const articles = document.querySelectorAll('.article-card');

    // Add click event to each article card
    articles.forEach(article => {
        article.addEventListener('click', function(e) {
            // Don't trigger if clicking on read more link (let that handle navigation)
            if (!e.target.classList.contains('read-more') && !e.target.parentElement.classList.contains('read-more')) {
                // In a real site, this would navigate to the full article
                console.log('Article clicked: ' + this.querySelector('h3').textContent);
                // You could add: window.location.href = 'article.html';
            }
        });
    });

    // Add animation to articles when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each article card
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(article);
    });

    // View all button click handler
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View all articles clicked');
            // In a real site, this would navigate to all articles page
            // window.location.href = 'all-articles.html';
        });
    }
});

// ===============================
// Interactive Map Section Start
// =============================
document.addEventListener('DOMContentLoaded', function() {
    // Select all map points
    const mapPoints = document.querySelectorAll('.map-point');

    // Add click event to each map point
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Get location and price data from dataset
            const location = this.dataset.location;
            const price = this.dataset.price;

            if (!location || !price) return;

            // Show alert with location and price info
            alert(`You clicked on ${location}. Packages start at ${price}`);
        });
    });

    // Adjust map points for mobile devices
    function adjustMapPoints() {
        const isMobile = window.innerWidth <= 768;
        mapPoints.forEach(point => {
            point.style.transform = isMobile ? 'scale(0.7)' : 'scale(1)';
        });
    }

    // Initial adjustment
    adjustMapPoints();

    // Adjust on window resize
    window.addEventListener('resize', adjustMapPoints);

    // Better touch support for mobile
    mapPoints.forEach(point => {
        point.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        }, { passive: false });
    });
});

// ================================= 
// Social Media Feed Section Start
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the social media feed functionality
    initSocialMediaFeed();
});

function initSocialMediaFeed() {
    // Add click event listeners to all social cards
    const socialCards = document.querySelectorAll('.social-card');

    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if user clicked on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }

            // Get the platform type
            const platform = this.classList.contains('instagram') ? 'Instagram' :
                this.classList.contains('twitter') ? 'Twitter' : 'Facebook';

            // In a real app, this would open the actual post
            console.log(`Opening ${platform} post in a modal or new tab`);

            // For demo purposes, we'll just show an alert
            alert(`This would normally open the ${platform} post in a modal or new tab.`);
        });
    });

    // Add hover effects for social links
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Click handler for social links
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('instagram') ? 'Instagram' :
                this.classList.contains('facebook') ? 'Facebook' :
                    this.classList.contains('twitter') ? 'Twitter' :
                        this.classList.contains('youtube') ? 'YouTube' : 'Pinterest';

            alert(`This would normally redirect to our ${platform} page.`);

            // In a real app, you would use:
            // window.open('https://your-social-media-url', '_blank');
        });
    });

    // Add animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to all social cards
    const animatedCards = document.querySelectorAll('.social-card, .social-cta');
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Log social interactions for analytics (demo purposes)
    console.log('Social media feed initialized. Ready to track engagement!');
}

// ======================
// About Section JS Page
// =====================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, you would open a lightbox here
            // This is a simplified version that just logs to console
            console.log('Clicked image:', this.alt);
        });
    });

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});

/* =============== Contact Section Page ===================  */
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            console.log('Form submitted:', { name, email, subject, message });
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // FAQ Accordion
    const contactQuestions = document.querySelectorAll('.contact-faq-question');
    contactQuestions.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            if (answer) {
                answer.classList.toggle('show');
            }
        });
    });

    // Feedback Rating System
    const contactStars = document.querySelectorAll('.contact-stars i');
    const contactRatingValue = document.getElementById('contactRatingValue');

    if (contactStars.length > 0 && contactRatingValue) {
        contactStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                
                contactStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
                
                contactRatingValue.value = rating;
            });
        });
    }

    // Feedback Form Submission
    const contactFeedbackForm = document.getElementById('contactFeedbackForm');
    if (contactFeedbackForm) {
        contactFeedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = contactRatingValue?.value;
            const feedback = document.getElementById('contactFeedback')?.value;
            
            if (!rating || rating === '0') {
                alert('Please select a rating.');
                return;
            }
            
            console.log('Feedback submitted:', { rating, feedback });
            alert('Thank you for your feedback!');
            this.reset();
            
            if (contactStars.length > 0 && contactRatingValue) {
                contactStars.forEach(star => {
                    star.classList.remove('active');
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
                contactRatingValue.value = '0';
            }
        });
    }

    // Initialize Google Maps
    if (typeof google !== 'undefined') {
        initContactMap();
    } else {
        loadContactGoogleMaps();
    }
});

// Google Maps Integration
function initContactMap() {
    try {
        const mapElement = document.getElementById('contactMap');
        if (!mapElement) return;
        
        mapElement.innerHTML = '<p>Loading map...</p>';
        
        const defaultLocation = { lat: 40.7128, lng: -74.0060 };
        const map = new google.maps.Map(mapElement, {
            zoom: 12,
            center: defaultLocation
        });
        
        new google.maps.Marker({
            position: defaultLocation,
            map: map,
            title: 'Travel Smart Main Office'
        });
        
        const findNearestBtn = document.getElementById('contactFindNearestBtn');
        if (findNearestBtn) {
            findNearestBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            
                            map.setCenter(userLocation);
                            map.setZoom(14);
                            
                            new google.maps.Marker({
                                position: userLocation,
                                map: map,
                                title: 'Your Location',
                                icon: {
                                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                }
                            });
                            
                            alert('Finding the nearest Travel Smart office to your location...');
                        },
                        () => {
                            alert('Unable to retrieve your location. Using default location instead.');
                            map.setCenter(defaultLocation);
                            map.setZoom(12);
                        }
                    );
                } else {
                    alert('Geolocation is not supported by your browser.');
                }
            });
        }
    } catch (error) {
        console.error('Google Maps failed to load:', error);
        const mapElement = document.getElementById('contactMap');
        if (mapElement) {
            mapElement.innerHTML = `
                <div class="map-error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>This page didn't load Google Maps correctly.</p>
                </div>
            `;
        }
    }
}

// Load Google Maps API
function loadContactGoogleMaps() {
    const script = document.createElement('script');
    // REPLACE WITH YOUR ACTUAL GOOGLE MAPS API KEY
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initContactMap`;
    script.async = true;
    script.defer = true;
    script.onerror = function() {
        const mapElement = document.getElementById('contactMap');
        if (mapElement) {
            mapElement.innerHTML = `
                <div class="map-error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>This page didn't load Google Maps correctly.</p>
                </div>
            `;
        }
    };
    document.head.appendChild(script);
}

/* ============ Login Form Page Section Start =============== */
document.addEventListener('DOMContentLoaded', function() {
    // Toggle between Login and Signup forms
    const loginContainer = document.querySelector('.auth__container');
    const signupContainer = document.querySelector('.auth__signup-container');
    const showSignup = document.querySelector('.auth__link');
    const showLogin = document.querySelector('.auth__login-link');

    if (showSignup && showLogin && loginContainer && signupContainer) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        });

        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // Password toggle functionality
    document.querySelectorAll('.auth__password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const inputContainer = this.closest('.auth__input-group');
            if (!inputContainer) return;
            
            const passwordInput = inputContainer.querySelector('.auth__input');
            if (!passwordInput) return;
            
            const icon = this.querySelector('i');
            if (!icon) return;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('title', 'Hide Password');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('title', 'Show Password');
            }
        });
    });

    // Login Form Handling
    const loginForm = document.querySelector('.auth__form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            console.log('Login attempt with:', { email, password });
            alert('Login successful!\n(Note: This is a demo. In a real app, this would authenticate with your server.)');
            this.reset();
        });
    }

    // Social Buttons Animation
    const socialButtons = document.querySelectorAll('.auth__social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

// ============================
// Sign-up Section Page Start 
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    document.querySelectorAll('.signup-password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const inputContainer = this.closest('.signup-input-group');
            if (!inputContainer) return;
            
            const passwordInput = inputContainer.querySelector('input[type="password"], input[type="text"]');
            if (!passwordInput) return;
            
            const icon = this.querySelector('i');
            if (!icon) return;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('title', 'Hide Password');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('title', 'Show Password');
            }
        });
    });

    // Signup Form Handling
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name')?.value;
            const email = document.getElementById('signup-email')?.value;
            const password = document.getElementById('signup-password')?.value;
            const confirmPassword = document.getElementById('signup-confirm-password')?.value;
            const termsChecked = document.querySelector('.signup-terms-checkbox input')?.checked;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (!termsChecked) {
                alert('You must agree to the Terms & Conditions');
                return;
            }
            
            console.log('Registration attempt with:', { name, email, password });
            alert('Registration successful!\n(Note: This is a demo. In a real app, this would send data to your server.)');
            
            this.reset();
        });
    }

    // Social Buttons Animation
    const socialButtons = document.querySelectorAll('.signup-social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

// ==========================
// feedback Section JS Page 
// =======================
// Feedback Form JavaScript for Beginners

// Wait until the webpage is fully loaded
window.onload = function() {

  // Get all the important elements from the page
  var feedbackForm = document.getElementById('travelFeedbackForm');
  var successMessage = document.getElementById('submissionConfirmation');
  var stars = document.querySelectorAll('.single-star');
  var ratingInput = document.getElementById('selectedRating');
  
  // Keep track if form was submitted
  var isFormSubmitted = false;

  // Set up star rating functionality
  stars.forEach(function(star) {
    // Make stars keyboard accessible
    star.setAttribute('tabindex', '0');
    star.setAttribute('aria-label', 'Rate ' + star.getAttribute('data-value') + ' out of 5');
    
    // When a star is clicked
    star.addEventListener('click', function() {
      var starValue = parseInt(this.getAttribute('data-value'));
      setStarRating(starValue);
    });
    
    // When hovering over stars
    star.addEventListener('mouseover', function() {
      if (!isFormSubmitted) {
        var hoverValue = parseInt(this.getAttribute('data-value'));
        colorStars(hoverValue);
      }
    });
    
    // Allow keyboard control
    star.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var keyValue = parseInt(this.getAttribute('data-value'));
        setStarRating(keyValue);
      }
    });
  });

  // Reset stars when mouse leaves
  document.querySelector('.rating-stars-container').addEventListener('mouseleave', function() {
    if (!isFormSubmitted) {
      var currentRating = parseInt(ratingInput.value);
      colorStars(currentRating);
    }
  });

  // Handle form submission
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    isFormSubmitted = true;
    
    // Clear previous errors
    clearErrors();
    
    // Check if form is valid
    if (checkForm()) {
      // Prepare data to send (in real app, this would go to server)
      var formInfo = {
        name: document.getElementById('travelerName').value.trim(),
        email: document.getElementById('travelerEmail').value.trim(),
        type: document.getElementById('feedbackType').value,
        stars: ratingInput.value,
        feeling: document.querySelector('input[name="experienceMood"]:checked') ? document.querySelector('input[name="experienceMood"]:checked').value : 'not specified',
        comments: document.getElementById('detailedFeedback').value.trim(),
        wouldRecommend: document.querySelector('input[name="recommend"]:checked') ? document.querySelector('input[name="recommend"]:checked').value : 'not specified'
      };
      
      console.log('Collected form data:', formInfo);
      
      // Show thank you message
      showThankYou();
      
      // Reset form after 4 seconds
      setTimeout(resetForm, 4000);
    } else {
      isFormSubmitted = false;
    }
  });

  // Function to set star rating
  function setStarRating(num) {
    ratingInput.value = num;
    colorStars(num);
    
    // Tell screen readers about the rating
    var announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'screen-reader-only';
    announcement.textContent = 'You rated ' + num + ' out of 5 stars';
    document.body.appendChild(announcement);
    setTimeout(function() {
      announcement.remove();
    }, 1000);
  }

  // Color the stars up to selected number
  function colorStars(upTo) {
    stars.forEach(function(star, index) {
      if (index < upTo) {
        star.textContent = '★';
        star.classList.add('active');
      } else {
        star.textContent = '☆';
        star.classList.remove('active');
      }
    });
  }

  // Clear all error messages
  function clearErrors() {
    var errors = document.querySelectorAll('.validation-error');
    errors.forEach(function(error) {
      error.style.display = 'none';
    });
    
    var errorInputs = document.querySelectorAll('.input-error-state');
    errorInputs.forEach(function(input) {
      input.classList.remove('input-error-state');
    });
  }

  // Validate the form
  function checkForm() {
    var isValid = true;
    var name = document.getElementById('travelerName').value.trim();
    var email = document.getElementById('travelerEmail').value.trim();
    var comments = document.getElementById('detailedFeedback').value.trim();
    var stars = ratingInput.value;
    var category = document.getElementById('feedbackType').value;
    
    // Check name
    if (name === '') {
      document.getElementById('nameValidationError').textContent = 'Please enter your name';
      document.getElementById('nameValidationError').style.display = 'block';
      document.getElementById('travelerName').classList.add('input-error-state');
      isValid = false;
    }
    
    // Check email
    if (email === '') {
      document.getElementById('emailValidationError').textContent = 'Please enter your email';
      document.getElementById('emailValidationError').style.display = 'block';
      document.getElementById('travelerEmail').classList.add('input-error-state');
      isValid = false;
    } else if (!checkEmail(email)) {
      document.getElementById('emailValidationError').textContent = 'Please enter a valid email';
      document.getElementById('emailValidationError').style.display = 'block';
      document.getElementById('travelerEmail').classList.add('input-error-state');
      isValid = false;
    }
    
    // Check category
    if (category === '') {
      alert('Please choose a feedback category');
      isValid = false;
    }
    
    // Check stars
    if (stars === '0') {
      alert('Please rate your experience by clicking the stars');
      isValid = false;
    }
    
    // Check comments
    if (comments === '') {
      document.getElementById('feedbackValidationError').textContent = 'Please share your feedback';
      document.getElementById('feedbackValidationError').style.display = 'block';
      document.getElementById('detailedFeedback').classList.add('input-error-state');
      isValid = false;
    } else if (comments.length < 20) {
      document.getElementById('feedbackValidationError').textContent = 'Please write more (at least 20 characters)';
      document.getElementById('feedbackValidationError').style.display = 'block';
      document.getElementById('detailedFeedback').classList.add('input-error-state');
      isValid = false;
    }
    
    return isValid;
  }

  // Check if email is valid
  function checkEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  // Show thank you message
  function showThankYou() {
    feedbackForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // For screen readers
    var message = document.createElement('div');
    message.setAttribute('aria-live', 'polite');
    message.className = 'screen-reader-only';
    message.textContent = 'Thank you for your feedback';
    document.body.appendChild(message);
    setTimeout(function() {
      message.remove();
    }, 1000);
  }

  // Reset the form
  function resetForm() {
    feedbackForm.reset();
    ratingInput.value = '0';
    colorStars(0);
    feedbackForm.style.display = 'block';
    successMessage.style.display = 'none';
    isFormSubmitted = false;
    
    // Scroll back to form smoothly
    feedbackForm.scrollIntoView({ behavior: 'smooth' });
  }

  // Add styles for screen readers
  var screenReaderStyle = document.createElement('style');
  screenReaderStyle.textContent = '.screen-reader-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }';
  document.head.appendChild(screenReaderStyle);
};