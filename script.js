document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || slides.length === 0) {
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; 
    let slideTimer;
  
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
       
        currentIndex = index;
        
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
      
        resetTimer();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function resetTimer() {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, slideInterval);
    }
    
    function initSlideshow() {
        goToSlide(0);
    }
    
    initSlideshow();
 
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

        if (touchEndX < touchStartX - 50) {

            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + 50) {

            goToSlide(currentIndex - 1);
        }
    }

    const interestTextarea = document.getElementById('interest');
    const charCount = document.getElementById('charCount');
    
    if (interestTextarea && charCount) {
        interestTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;

            if (currentLength >= 180) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#777';
            }
        });
    }
    
    
    const notifyForm = document.getElementById('notify-form');
    const formMessage = document.getElementById('form-message');
    
    if (notifyForm) {
        window.addEventListener('load', () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('formSubmitted')) {
                formMessage.textContent = "Thank you! Your email has been submitted.";
                formMessage.style.color = '#2ecc71';
                
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }
        });
        

        notifyForm.addEventListener('submit', function(event) {
            const email = document.getElementById('email').value;
            
            if (!email || !email.includes('@')) {
                event.preventDefault();
                formMessage.textContent = "Please enter a valid email address.";
                formMessage.style.color = '#e74c3c';
                return false;
            }
          
        });
    }
    
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
