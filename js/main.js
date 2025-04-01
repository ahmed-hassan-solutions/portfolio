// filepath: f:\test\js\main.js

document.addEventListener('DOMContentLoaded', function () {
    // Page transition effect
    const pageTransition = () => {
        const body = document.querySelector('body');
        body.classList.add('fade-out');

        document.querySelectorAll('a').forEach(link => {
            // Only apply to internal links, not external links or anchors
            if (link.hostname === window.location.hostname &&
                !link.href.includes('#') &&
                !link.target &&
                link.getAttribute('href') !== '#') {

                link.addEventListener('click', function (e) {
                    if (!(e.ctrlKey || e.metaKey || e.shiftKey)) {
                        e.preventDefault();
                        body.classList.add('fade-out');

                        setTimeout(() => {
                            window.location.href = this.href;
                        }, 300);
                    }
                });
            }
        });

        // Add fade-in class when page has loaded
        body.classList.add('fade-in');
        body.classList.remove('fade-out');
    };

    // Initialize page transition
    pageTransition();

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            // Toggle the mobile menu with a slide animation
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '0';
                mobileMenu.style.overflow = 'hidden';
                mobileMenu.style.transition = 'max-height 0.3s ease-in-out';

                // Trigger animation
                setTimeout(() => {
                    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                }, 10);
            } else {
                mobileMenu.style.maxHeight = '0';

                // After animation finishes, hide the menu
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Add scroll effect to navigation
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) {
                nav.classList.add('nav-scrolled');
                nav.style.padding = '0.5rem 0';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                nav.classList.remove('nav-scrolled');
                nav.style.padding = '0.75rem 0';
                nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Add active class to current section in navigation
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('text-accent');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('text-accent');
        }
    });

    // Animation on scroll functionality
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.stagger-children, .animate-fade-in, .slide-in-left, .slide-in-right');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stagger-children')) {
                        entry.target.classList.add('stagger-visible');
                    }

                    // For other animation classes, we don't need to add anything as the CSS animation will play once visible
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Slightly before the element comes into view
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize animations
    handleScrollAnimations();

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-animated');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Apply floating animation to select elements
    const floatingElements = document.querySelectorAll('.service-card, .testimonial-card');
    floatingElements.forEach((element, index) => {
        // Stagger the animations slightly
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('float-animation');
    });

    // Form field animations
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function () {
            this.classList.add('shadow-lg');
            this.style.transform = 'scale(1.02)';
        });

        field.addEventListener('blur', function () {
            this.classList.remove('shadow-lg');
            this.style.transform = 'scale(1)';
        });
    });

    // Enhance icon animations
    const iconElements = document.querySelectorAll('.icon-pulse');
    iconElements.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            const iconElement = this.querySelector('i');
            if (iconElement) {
                iconElement.classList.add('text-accent');
            }
        });

        icon.addEventListener('mouseleave', function () {
            const iconElement = this.querySelector('i');
            if (iconElement) {
                iconElement.classList.remove('text-accent');
            }
        });
    });

    // Initialize any card-flip elements
    const cardFlipContainers = document.querySelectorAll('.card-flip-container');
    cardFlipContainers.forEach(container => {
        container.addEventListener('mouseenter', function () {
            this.querySelector('.card-flip').style.transform = 'rotateY(180deg)';
        });

        container.addEventListener('mouseleave', function () {
            this.querySelector('.card-flip').style.transform = 'rotateY(0deg)';
        });
    });
});
