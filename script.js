/**
 * LTK Creative & Marketing Agency - Enhanced Main JavaScript
 * Mobile-optimized with perfect hamburger menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE NAVIGATION (PERFECTED)
    // ======================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const html = document.documentElement;
    
    // Track menu state and scroll position
    let isMenuOpen = false;
    let scrollPosition = 0;
    
    // Enhanced toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle classes
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        
        // Handle scroll locking
        if (isMenuOpen) {
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            html.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition);
        }
    }
    
    // Hamburger click with enhanced touch support
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking outside (improved for touch)
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('#hamburger')) {
            toggleMenu();
        }
    });
    
    // Enhanced mobile link handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                if (isMenuOpen) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    toggleMenu();
                    
                    // Smooth scroll after menu closes
                    setTimeout(() => {
                        if (targetId.startsWith('#')) {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                const navbarHeight = navbar.offsetHeight;
                                const targetPosition = targetElement.offsetTop - navbarHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                                
                                // Update URL
                                history.pushState(null, null, targetId);
                            }
                        }
                    }, 350); // Matches CSS transition timing
                }
            }
        });
    });
    
    // ======================
    // STICKY NAVIGATION
    // ======================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });
    
    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMenu();
                }
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ======================
    // ACTIVE NAV LINK TRACKING
    // ======================
    function updateActiveNavLink() {
        if (isMenuOpen) return;
        
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initialize active link
    updateActiveNavLink();
    
    // ======================
    // SERVICE CARD ANIMATIONS
    // ======================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isTouchDevice()) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isTouchDevice()) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // ======================
    // PARTNER CAROUSEL (OPTIMIZED)
    // ======================
    const partnerTrack = document.querySelector('.partner-track');
    if (partnerTrack) {
        // Clone for infinite loop
        partnerTrack.innerHTML += partnerTrack.innerHTML;
        
        // Adjust animation speed based on content
        const logoCount = document.querySelectorAll('.partner-logo').length / 2;
        const duration = logoCount * 3; // 3 seconds per logo
        partnerTrack.style.animationDuration = `${duration}s`;
        
        // Desktop-only hover effects
        if (!isTouchDevice()) {
            partnerTrack.addEventListener('mouseenter', () => {
                partnerTrack.style.animationPlayState = 'paused';
            });
            
            partnerTrack.addEventListener('mouseleave', () => {
                partnerTrack.style.animationPlayState = 'running';
            });
        }
    }
    
    // ======================
    // SCROLL ANIMATIONS
    // ======================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .why-item, .section-header'
        );
        
        // Set initial state
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Initial check
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.service-card, .why-item, .section-header'
        );
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    initScrollAnimations();
    
    // ======================
    // RESIZE HANDLER (FOR MENU)
    // ======================
    function handleResize() {
        if (window.innerWidth > 992 && isMenuOpen) {
            toggleMenu();
        }
    }
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // ======================
    // UTILITY FUNCTIONS
    // ======================
    function isTouchDevice() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }
    
    // Initialize touch device class
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // Update footer year
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${new Date().getFullYear()} LTK Creative | All rights reserved`;
    }
});