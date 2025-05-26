document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .notify-section').forEach(el => {
        observer.observe(el);
    });

    function enhanceFormExperience() {
        const form = document.getElementById('notify-form');
        if (form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                form.addEventListener('submit', function(e) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    form.classList.add('loading');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.classList.remove('loading');
                    }, 5000);
                });
            }
        }
    }

    function addLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slider && slides.length > 0) {
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

    enhanceFormExperience();
    addLazyLoading();
});