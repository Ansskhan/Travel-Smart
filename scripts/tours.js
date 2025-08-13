// Mobile Filter Toggle
const mobileFilterToggle = document.querySelector('.auction-mobile-filter-toggle');
const filtersSidebar = document.querySelector('.auction-filters-sidebar');
const sidebarOverlay = document.querySelector('.auction-sidebar-overlay');
const closeFilters = document.querySelector('.auction-close-filters');

mobileFilterToggle.addEventListener('click', () => {
    filtersSidebar.classList.add('auction-active');
    sidebarOverlay.classList.add('auction-active');
    document.body.style.overflow = 'hidden';
});

closeFilters.addEventListener('click', () => {
    filtersSidebar.classList.remove('auction-active');
    sidebarOverlay.classList.remove('auction-active');
    document.body.style.overflow = '';
});

sidebarOverlay.addEventListener('click', () => {
    filtersSidebar.classList.remove('auction-active');
    sidebarOverlay.classList.remove('auction-active');
    document.body.style.overflow = '';
});

// Price Range Slider
const priceInputs = document.querySelectorAll('.auction-price-input');
const priceSlider = document.querySelector('.auction-slider-progress');
const sliderHandles = document.querySelectorAll('.auction-slider-handle');
const priceSliderBtns = document.querySelectorAll('.auction-price-slider-btn');
const minPriceInput = document.getElementById('auctionMinPrice');
const maxPriceInput = document.getElementById('auctionMaxPrice');

// Set initial price range
let minPrice = 0;
let maxPrice = 10000;
let minVal = 0;
let maxVal = 10000;

// Update slider progress
function updateSlider() {
    const minPercent = (minVal / maxPrice) * 100;
    const maxPercent = 100 - (maxVal / maxPrice) * 100;

    priceSlider.style.left = minPercent + "%";
    priceSlider.style.right = maxPercent + "%";

    sliderHandles[0].style.left = minPercent + "%";
    sliderHandles[1].style.left = (100 - maxPercent) + "%";

    minPriceInput.value = minVal;
    maxPriceInput.value = maxVal;
}

// Initialize slider
updateSlider();

// Handle slider movement - improved for mouse and touch
sliderHandles.forEach((handle, index) => {
    let moveHandler;
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        moveHandler = function(e) {
            const sliderRect = priceSlider.parentElement.getBoundingClientRect();
            let x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            let percent = ((x - sliderRect.left) / sliderRect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            if (index === 0) { // Min handle
                const maxPercent = (maxVal / maxPrice) * 100;
                percent = Math.min(percent, maxPercent - 5);
                minVal = Math.round((percent / 100) * maxPrice);
            } else { // Max handle
                const minPercent = (minVal / maxPrice) * 100;
                percent = Math.max(percent, minPercent + 5);
                maxVal = Math.round((percent / 100) * maxPrice);
            }
            if (minVal > maxVal - 1) minVal = maxVal - 1;
            if (maxVal < minVal + 1) maxVal = minVal + 1;
            updateSlider();
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveHandler);
        }, { once: true });
    });
    handle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveHandler = function(e) {
            const sliderRect = priceSlider.parentElement.getBoundingClientRect();
            let x = e.touches[0].clientX;
            let percent = ((x - sliderRect.left) / sliderRect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            if (index === 0) {
                const maxPercent = (maxVal / maxPrice) * 100;
                percent = Math.min(percent, maxPercent - 5);
                minVal = Math.round((percent / 100) * maxPrice);
            } else {
                const minPercent = (minVal / maxPrice) * 100;
                percent = Math.max(percent, minPercent + 5);
                maxVal = Math.round((percent / 100) * maxPrice);
            }
            if (minVal > maxVal - 1) minVal = maxVal - 1;
            if (maxVal < minVal + 1) maxVal = minVal + 1;
            updateSlider();
        };
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', moveHandler);
        }, { once: true });
    });
});

priceInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        let value = parseInt(input.value) || 0;
        if (index === 0) {
            minVal = Math.min(Math.max(0, value), maxVal - 1);
        } else {
            maxVal = Math.max(Math.min(maxPrice, value), minVal + 1);
        }
        updateSlider();
    });
});

priceSliderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        minVal = parseInt(btn.dataset.min);
        maxVal = parseInt(btn.dataset.max);
        updateSlider();
    });
});

// Filter Toggle Functionality
const filterTitles = document.querySelectorAll('.auction-filter-title');
filterTitles.forEach(title => {
    title.addEventListener('click', () => {
        const options = title.nextElementSibling;
        const icon = title.querySelector('i');
        if (options.style.display === 'none') {
            options.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        } else {
            options.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        }
    });
    title.nextElementSibling.style.display = 'block';
    title.querySelector('i').style.transform = 'rotate(180deg)';
});

// Reset Filters
const resetFilters = document.querySelector('.auction-reset-filters');
resetFilters.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.auction-filters-sidebar input[type="checkbox"]');
    const radios = document.querySelectorAll('.auction-filters-sidebar input[type="radio"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    radios.forEach(radio => {
        if (radio.value === 'all') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    minVal = 0;
    maxVal = 10000;
    updateSlider();
});

// Apply Filters Button - Always visible, even on desktop
const applyFiltersBtn = document.querySelector('.auction-apply-filters-btn');
applyFiltersBtn.addEventListener('click', () => {
    filtersSidebar.classList.remove('auction-active');
    sidebarOverlay.classList.remove('auction-active');
    document.body.style.overflow = '';
    // In a real app, this would apply the filters
    console.log('Applying filters...');
    console.log('Price range:', minVal, '-', maxVal);
});

// Countdown Timer
const auctionTimers = document.querySelectorAll('.auction-time');
function updateCountdown() {
    auctionTimers.forEach(timer => {
        const endTime = new Date(timer.getAttribute('data-endtime')).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;
        if (distance < 0) {
            timer.innerHTML = '<i class="far fa-clock"></i> Auction Ended';
            timer.style.color = '#e74c3c';
            timer.style.fontWeight = 'bold';
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let timeString = '';
        if (days > 0) timeString += `${days}d `;
        if (hours > 0 || days > 0) timeString += `${hours}h `;
        timeString += `${minutes}m ${seconds}s`;
        timer.innerHTML = `<i class="far fa-clock"></i> Ends in: ${timeString}`;
        if (distance < 3600000) {
            timer.style.color = '#e74c3c';
            timer.style.fontWeight = 'bold';
        } else {
            timer.style.color = '#7f8c8d';
            timer.style.fontWeight = '';
        }
    });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Wishlist Button Functionality
const wishlistBtns = document.querySelectorAll('.auction-wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('auction-active');
        if (this.classList.contains('auction-active')) {
            this.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            this.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
});

// Sort Functionality
const sortSelect = document.querySelector('.auction-sort-by');
sortSelect.addEventListener('change', function() {
    // In a real app, this would trigger an API call or filter the existing items
    console.log('Sorting by:', this.value);
});

// Pagination
const pageBtns = document.querySelectorAll('.auction-page-btn');
pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        pageBtns.forEach(b => b.classList.remove('auction-page-active'));
        if (!isNaN(parseInt(this.textContent))) {
            this.classList.add('auction-page-active');
        }
        console.log('Loading page:', this.textContent);
    });
});