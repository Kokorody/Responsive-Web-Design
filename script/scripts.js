document.addEventListener('DOMContentLoaded', function() {
    // Existing menu toggle code
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            menuToggle.innerHTML = '&times;';
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach(item => {
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = null;
            });
        } else {
            menuToggle.innerHTML = '&#9776;';
        }
    });
    
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '&#9776;';
        }
    });

    menuToggle.addEventListener('mouseover', function() {
        if (navMenu.classList.contains('active')) {
            menuToggle.style.transform = 'rotate(90deg)';
        }
    });

    menuToggle.addEventListener('mouseout', function() {
        menuToggle.style.transform = 'rotate(0)';
    });

    // ==== FEATURES SLIDESHOW ====
    // Original Feature Slideshow functionality
    let slideIndex = 0;
    let slides = document.querySelectorAll(".slide");
    let totalSlides = slides.length; 
    const slidesWrapper = document.querySelector(".slides-wrapper");
    let isSwiping = false;
    let startX = 0;

    // Function to move slides
    window.moveSlide = function (step) {
        let isMobile = window.innerWidth <= 767;
        slideIndex += step;

        if (slideIndex >= totalSlides) slideIndex = 0;
        if (slideIndex < 0) slideIndex = totalSlides - 1;

        updateSlidePosition();
        updateDots();
    };

    // Function to update slide position
    function updateSlidePosition() {
        let isMobile = window.innerWidth <= 767;
        let translateValue = isMobile ? slideIndex * 100 : slideIndex * 50;
        slidesWrapper.style.transform = `translateX(-${translateValue}%)`;
    }

    // Function to update dots
    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === slideIndex);
        });
    }

    // Function to jump to a specific slide
    window.currentSlide = function (index) {
        slideIndex = index;
        updateSlidePosition();
        updateDots();
    };

    // Handle touch events for mobile swipe
    if (slidesWrapper) {
        slidesWrapper.addEventListener("touchstart", (e) => {
            isSwiping = true;
            startX = e.touches[0].clientX;
        });

        slidesWrapper.addEventListener("touchmove", (e) => {
            if (!isSwiping) return;
            let moveX = e.touches[0].clientX - startX;
            if (moveX > 50) {
                moveSlide(-1);
                isSwiping = false;
            } else if (moveX < -50) {
                moveSlide(1);
                isSwiping = false;
            }
        });

        slidesWrapper.addEventListener("touchend", () => {
            isSwiping = false;
        });
    }

    // Update slide position when window resizes
    window.addEventListener("resize", function() {
        if (slidesWrapper) {
            updateSlidePosition();
        }
        if (benefitsWrapper) {
            updateBenefitPosition();
        }
    });

    // ==== BENEFITS SLIDESHOW ====
    // Benefits slideshow functionality
    let benefitIndex = 0;
    const benefitSlides = document.querySelectorAll(".benefit-slide");
    const totalBenefitSlides = benefitSlides.length;
    const benefitsWrapper = document.querySelector(".benefits-wrapper");
    const benefitDots = document.querySelectorAll(".benefit-dot");
    
    // Initialize the benefits slideshow if elements exist
    if (benefitsWrapper) {
        updateBenefitPosition();
    }
    
    // Function to move benefit slides
    window.moveBenefitSlide = function(step) {
        benefitIndex += step;
        
        // Loop through slides
        if (benefitIndex >= totalBenefitSlides) {
            benefitIndex = 0;
        }
        if (benefitIndex < 0) {
            benefitIndex = totalBenefitSlides - 1;
        }
        
        updateBenefitPosition();
        updateBenefitDots();
    };
    
    // Function to update benefit slide position
    function updateBenefitPosition() {
        benefitsWrapper.style.transform = `translateX(-${benefitIndex * 100}%)`;
    }
    
    // Function to update benefit dots
    function updateBenefitDots() {
        document.querySelectorAll(".benefit-dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === benefitIndex);
        });
    }
    
    // Function to jump to a specific benefit slide
    window.currentBenefitSlide = function(index) {
        benefitIndex = index;
        updateBenefitPosition();
        updateBenefitDots();
    };
    
    // Handle touch events for mobile swipe on benefits
    let isBenefitSwiping = false;
    let benefitStartX = 0;
    
    if (benefitsWrapper) {
        benefitsWrapper.addEventListener("touchstart", (e) => {
            isBenefitSwiping = true;
            benefitStartX = e.touches[0].clientX;
        });
        
        benefitsWrapper.addEventListener("touchmove", (e) => {
            if (!isBenefitSwiping) return;
            let moveX = e.touches[0].clientX - benefitStartX;
            if (moveX > 50) {
                moveBenefitSlide(-1);
                isBenefitSwiping = false;
            } else if (moveX < -50) {
                moveBenefitSlide(1);
                isBenefitSwiping = false;
            }
        });
        
        benefitsWrapper.addEventListener("touchend", () => {
            isBenefitSwiping = false;
        });
        
        // Auto-advance benefit slides every 5 seconds
        let benefitInterval = setInterval(() => moveBenefitSlide(1), 5000);
        
        // Pause auto-advance when user interacts with benefits slideshow
        const benefitsContainer = document.querySelector(".benefits-container");
        
        if (benefitsContainer) {
            benefitsContainer.addEventListener("mouseenter", () => {
                clearInterval(benefitInterval);
            });
            
            benefitsContainer.addEventListener("mouseleave", () => {
                benefitInterval = setInterval(() => moveBenefitSlide(1), 5000);
            });
        }
    }
});

// CONTACT US - FORM
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop form submit
            
            clearErrors();
            
            let isValid = true;
            let errorMessages = [];

            const name = document.getElementById('Name').value.trim();
            const email = document.getElementById('Email').value.trim();
            const message = document.getElementById('Message').value.trim();

            if (name === '') {
                errorMessages.push('Name is required.');
                isValid = false;
            }

            if (email === '') {
                errorMessages.push('Email is required.');
                isValid = false;
            } else if (!validateEmail(email)) {
                errorMessages.push('Invalid email format.');
                isValid = false;
            }

            if (message === '') {
                errorMessages.push('Message is required.');
                isValid = false;
            }

            if (!isValid) {
                displayError(errorMessages);
            } else {
                document.getElementById('errorMsg').innerHTML = '<span style="color: green;">Pesan berhasil dikirim!</span>';
                // Optionally reset form:
                // this.reset();
            }
        });
    }

    function displayError(messages) {
        const errorDiv = document.getElementById('errorMsg');
        if (errorDiv) {
            errorDiv.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
        }
    }

    function clearErrors() {
        const errorDiv = document.getElementById('errorMsg');
        if (errorDiv) {
            errorDiv.innerHTML = '';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});