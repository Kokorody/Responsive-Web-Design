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

    // Image Slideshow functionality
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

    // ✅ Fix: Update slide position when window resizes
    window.addEventListener("resize", updateSlidePosition);


});
