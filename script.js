document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');
    const body = document.body;

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Prevent body scroll when menu is open (mobile optimization)
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside (touch-friendly)
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Optimized scroll handler using requestAnimationFrame
    const updateNavbar = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // Performance-optimized for mobile
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible (performance optimization)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // ========================================
    // MOBILE VIEWPORT HEIGHT FIX
    // Fixes 100vh issues on mobile browsers
    // ========================================
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    // Also update on orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // Enhanced for mobile
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Get navbar height for offset
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // TOUCH FEEDBACK FOR CARDS (Mobile)
    // Adds subtle touch feedback
    // ========================================
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.glass-card, .service-card, .btn-primary, .btn-secondary');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function () {
                this.style.opacity = '0.9';
            }, { passive: true });

            element.addEventListener('touchend', function () {
                this.style.opacity = '';
            }, { passive: true });

            element.addEventListener('touchcancel', function () {
                this.style.opacity = '';
            }, { passive: true });
        });
    }

    // ========================================
    // LAZY LOAD IMAGES (Performance)
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // PREVENT ZOOM ON DOUBLE TAP (iOS)
    // ========================================
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // ========================================
    // PERFORMANCE MONITORING (Development)
    // ========================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
    // ========================================
    // MULTI-STEP FORM MODAL
    // ========================================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');
    const triggerButtons = document.querySelectorAll('.trigger-modal');
    const wizardForm = document.getElementById('wizard-form');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const steps = document.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.step-dot');
    const optionCards = document.querySelectorAll('.option-card');

    let currentStep = 1;
    const totalSteps = steps.length;

    // Open Modal
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Option Selection (Visual Feedback)
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            // Auto-select radio button if not already handled by label
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Navigation Logic
    const updateWizard = () => {
        // Show/Hide Steps
        steps.forEach(step => {
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update Dots
        dots.forEach((dot, index) => {
            if (index < currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Buttons
        if (btnBack) {
            if (currentStep === 1) {
                btnBack.style.visibility = 'hidden';
            } else {
                btnBack.style.visibility = 'visible';
            }
        }

        if (btnNext) {
            if (currentStep === totalSteps) {
                btnNext.textContent = 'Submit Request';
            } else {
                btnNext.textContent = 'Next';
            }
        }
    };

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            // Validation
            const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const inputs = currentStepEl.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    // Reset border after change
                    input.addEventListener('input', () => {
                        input.style.borderColor = '';
                    });
                }
                // Check radio buttons group
                if (input.type === 'radio' && input.hasAttribute('required')) {
                    const group = document.getElementsByName(input.name);
                    let groupChecked = false;
                    for (let i = 0; i < group.length; i++) {
                        if (group[i].checked) groupChecked = true;
                    }
                    if (!groupChecked) {
                        isValid = false;
                        // Maybe highlight the container?
                    }
                }
            });

            if (!isValid) return;

            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            } else {
                // Submit Form
                if (wizardForm) wizardForm.submit();
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });
    }
});
