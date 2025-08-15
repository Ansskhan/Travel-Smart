let topBar = document.getElementById('top-bar');
let header = document.getElementById('main-header');
let footer = document.getElementById('footer');

topBar.innerHTML = `
        <div class="container">
            <div class="top-bar-left">
                <!-- Contact information -->
                <span><i class="fas fa-phone"></i> +1 (123) 456-7890</span>
                <span><i class="fas fa-envelope"></i> info@travelsmart.com</span>
            </div>
            <div class="top-bar-right">
                <!-- Language selector dropdown -->
                <div class="language-selector">
                    <i class="fas fa-globe"></i>
                    <select id="language" aria-label="Select language">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                    </select>
                </div>
                <!-- Currency selector dropdown -->
                <div class="currency-selector">
                    <i class="fas fa-money-bill-wave"></i>
                    <select id="currency" aria-label="Select currency">
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                    </select>
                </div>
            </div>
        </div>
`

header.innerHTML = `
        <div class="container">
            <!-- Logo with plane icon -->
            <div class="logo">
                <a href="index.html" aria-label="Travel Smart Home"><i class="fas fa-plane"></i> Travel Smart</a>
            </div>

            <!-- Mobile menu toggle button (hidden on desktop) -->
            <button class="mobile-menu-toggle" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>

            <!-- Search bar -->
            <div class="search-bar">
                <input type="text" placeholder="Search destinations or tours..." aria-label="Search destinations" id="searchInput">
              
            </div>

            <!-- Authentication buttons -->
            <div class="auth-buttons">
                <button class="login-btn" aria-label="Login"><a href="Login.html" style="text-decoration:none;color:blue; ">Login</a></button>
                <button class="signup-btn" aria-label="Sign Up"><a href="Sign-Up.html" style="text-decoration:none;color:white;">Sign Up</a></button>
            </div>
        </div>

        <!-- Main navigation menu -->
        <nav class="main-nav" aria-label="Main navigation">
            <div class="container">
                <ul class="nav-links">
                    <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="destinations.html"><i class="fas fa-map-marked-alt"></i> Destinations</a></li>
                    <li><a href="tours.html"><i class="fas fa-suitcase"></i>Tours</a></li>
                    <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
                    <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                    <li><a href="feedback.html"><i class="fas fa-comment-alt"></i> Feedback</a></li>
                </ul>
            </div>
        </nav>

`
footer.innerHTML = `
<footer class="travel-footer">
  <div class="footer-container">
    <!-- About Section -->
    <div class="footer-about">
      <h3>Travel Explorer</h3>
      <p>Making your travel dreams a reality with personalized service and unforgettable experiences since 2010. Discover the world with us!</p>
      <div class="social-icons">
        <a href="#" class="social-icon" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
          <span class="tooltip">Facebook</span>
        </a>
        <a href="#" class="social-icon" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
          <span class="tooltip">Instagram</span>
        </a>
        <a href="#" class="social-icon" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
          <span class="tooltip">Twitter</span>
        </a>
        <a href="#" class="social-icon" aria-label="YouTube">
          <i class="fab fa-youtube"></i>
          <span class="tooltip">YouTube</span>
        </a>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="footer-links" >
      <h3>Quick Links</h3>
      <ul >
        <li  ><a href="/index.html" ><i  class="fas fa-home"></i> Home</a></li>
        <li><a href="/destinations.html"><i class="fas fa-map-marked-alt"></i> Destinations</a></li>
        <li><a href="/tours.html"><i class="fas fa-suitcase"></i> Tours</a></li>
        <li><a href="/about.html"><i class="fas fa-info-circle"></i> About Us</a></li>
        <li><a href="/contact.html"><i class="fas fa-phone-alt"></i> Contact</a></li>
        <li><a href="/sitemap.html"><i class="fas fa-phone-alt"></i> Sitemap</a></li>
      </ul>
    </div>

    <!-- Contact Info -->
    <div class="footer-contact">
      <h3>Contact Us</h3>
      <ul>
        <li><i class="fas fa-map-marker-alt"></i> 123 Adventure St, Travel City, TC 12345</li>
        <li><i class="fas fa-phone"></i> +1 (123) 456-7890</li>
        <li><i class="fas fa-envelope"></i> info@travelexplorer.com</li>
        <li><i class="fas fa-clock"></i> Mon-Fri: 9AM - 6PM</li>
      </ul>
    </div>

    <!-- Newsletter -->
    <div class="footer-newsletter">
      <h3>Travel Newsletter</h3>
      <p>Subscribe for exclusive travel deals, tips and destination guides</p>
      <form id="travel-newsletter">
        <input type="email" placeholder="Your email address" required>
        <button type="submit"><i class="fas fa-paper-plane"></i> Subscribe</button>
      </form>
    </div>
  </div>

  <!-- Footer Bottom -->
  <div class="footer-bottom">
    <p>&copy; 2025 Travel Explorer. All rights reserved. <span>Adventure • Discovery • Memories</span></p>
    <div class="legal-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Travel Insurance</a>
    </div>
  </div>
</footer>

<!-- Floating Book Now Button -->
<div class="floating-book">
  <button class="btn-travel-primary">
    <i class="fas fa-plane"></i> Book Now
  </button>
</div>

<!-- Back to Top Button -->
<button id="back-to-top" class="back-to-top" aria-label="Back to top">
  <i class="fas fa-arrow-up"></i>
</button>

<!-- Floating Contact Button (Right Side) -->
<div class="floating-contact">
  <button class="btn-travel-contact">
    <i class="fas fa-headset"></i> Need Help?
  </button>
</div>

`