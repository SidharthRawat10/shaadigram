document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle menu icon between burger and close
            if (menuIcon && window.lucide) {
                const isOpened = navLinks.classList.contains('active');
                mobileMenuBtn.innerHTML = isOpened 
                    ? '<i data-lucide="x"></i>' 
                    : '<i data-lucide="menu"></i>';
                window.lucide.createIcons();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn && window.lucide) {
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    window.lucide.createIcons();
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn && window.lucide) {
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    window.lucide.createIcons();
                }
            });
        });
    }

    // ==========================================================================
    // 2. HEADER SCROLL STATE
    // ==========================================================================
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load in case page starts scrolled
    handleScroll();

    // ==========================================================================
    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .fade-up');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, no need to keep observing
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // offset to trigger slightly before/after scroll entry
        });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(elem => {
            elem.classList.add('active');
        });
    }

    // ==========================================================================
    // 4. CONTACT FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('event-contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple submission simulation animation
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="btn-icon animate-spin"></i>';
            if (window.lucide) window.lucide.createIcons();

            // Simulate server network latency
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (window.lucide) window.lucide.createIcons();
                
                // Show success state
                successMsg.style.display = 'flex';
                contactForm.reset();

                // Scroll to success message
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 1200);
        });
    }

});
