document.addEventListener('DOMContentLoaded', function() {
    // Existing menu toggle code
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change hamburger icon to X when menu is open
        if (navMenu.classList.contains('active')) {
            menuToggle.innerHTML = '&times;'; // × symbol
            
            // Reset animations when opening menu
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach(item => {
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;
            });
        } else {
            menuToggle.innerHTML = '&#9776;'; // ☰ symbol
        }
    });
    
    // Close menu when clicking anywhere in the menu (for mobile)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
            }
        });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '&#9776;';
        }
    });

    // Add event listener for the close button hover effect
    menuToggle.addEventListener('mouseover', function() {
        if (navMenu.classList.contains('active')) {
            menuToggle.style.transform = 'rotate(90deg)';
        }
    });
    
    menuToggle.addEventListener('mouseout', function() {
        menuToggle.style.transform = 'rotate(0)';
    });
    
    // NEW CODE: Image Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    // Expose these functions to the global scope for onclick handlers
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        
        // If no slides are found, exit the function
        if (!slides.length) return;
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        // Show the current slide and activate corresponding dot
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
    
    // // Optional: Auto slideshow
    // setInterval(function() {
    //     plusSlides(1);
    // }, 5000); // Change image every 5 seconds
});