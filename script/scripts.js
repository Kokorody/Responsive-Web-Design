document.addEventListener('DOMContentLoaded', function() {
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
});