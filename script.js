document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || slides.length === 0) {
        console.error('Slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; // Time between slide transitions (ms)
    let slideTimer;
    
    // Function to go to a specific slide
    function goToSlide(index) {
        // Normalize index to handle edge cases
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Move slider to show current slide
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Reset the timer
        resetTimer();
    }
    
    // Add click event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Function to advance to next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Set/reset the timer for automatic slide advancement
    function resetTimer() {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, slideInterval);
    }
    
    // Initialize the slideshow
    function initSlideshow() {
        goToSlide(0);
    }
    
    // Start the slideshow
    initSlideshow();
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }
    
    function handleSwipe() {
        // Detect left or right swipe
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            goToSlide(currentIndex - 1);
        }
    }
    
    // Character counter for interest text area
    const interestTextarea = document.getElementById('interest');
    const charCount = document.getElementById('charCount');
    
    if (interestTextarea && charCount) {
        interestTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            // Optional: Change color when approaching limit
            if (currentLength >= 180) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#777';
            }
        });
    }
    
    // Form feedback handler
    // StaticForms handles the actual submission, this just shows local feedback
    const notifyForm = document.getElementById('notify-form');
    const formMessage = document.getElementById('form-message');
    
    if (notifyForm) {
        // Check for URL parameters when the page loads (for feedback after redirect)
        window.addEventListener('load', () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('formSubmitted')) {
                formMessage.textContent = "Thank you! Your email has been submitted.";
                formMessage.style.color = '#2ecc71';
                
                // Clear the message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }
        });
        
        // Optional: Add client-side validation before form submit
        notifyForm.addEventListener('submit', function(event) {
            const email = document.getElementById('email').value;
            
            if (!email || !email.includes('@')) {
                event.preventDefault();
                formMessage.textContent = "Please enter a valid email address.";
                formMessage.style.color = '#e74c3c';
                return false;
            }
            
            // You can add local form processing here if needed
            // StaticForms will handle the actual submission and redirect
        });
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});