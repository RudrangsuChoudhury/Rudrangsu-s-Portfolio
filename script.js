// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeHamburgerMenu();
    initializeFormValidation();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeScrollToTop();
});

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

function initializeHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (!hamburgerBtn || !navLinks) return;

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        
        if (errors.length === 0) {
            displaySuccessMessage();
            form.reset();
            clearAllErrors();
        } else {
            displayFormErrors(errors);
        }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const errors = [];

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Validate name
    if (!nameInput.value.trim()) {
        errors.push('Name is required');
        nameInput.classList.add('error');
    } else if (nameInput.value.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
        nameInput.classList.add('error');
    } else {
        nameInput.classList.remove('error');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        errors.push('Email is required');
        emailInput.classList.add('error');
    } else if (!emailRegex.test(emailInput.value.trim())) {
        errors.push('Please enter a valid email address');
        emailInput.classList.add('error');
    } else {
        emailInput.classList.remove('error');
    }

    // Validate message
    if (!messageInput.value.trim()) {
        errors.push('Message is required');
        messageInput.classList.add('error');
    } else if (messageInput.value.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
        messageInput.classList.add('error');
    } else {
        messageInput.classList.remove('error');
    }

    return errors;
}

function validateField(field) {
    const fieldName = field.id;
    const fieldValue = field.value.trim();
    let isValid = true;

    if (fieldName === 'name') {
        isValid = fieldValue.length >= 2;
    } else if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(fieldValue);
    } else if (fieldName === 'message') {
        isValid = fieldValue.length >= 10;
    }

    if (isValid && fieldValue) {
        field.classList.remove('error');
    }

    return isValid;
}

function displayFormErrors(errors) {
    const errorContainer = document.getElementById('formErrors');
    const errorList = document.getElementById('errorList');

    errorList.innerHTML = '';
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });

    errorContainer.style.display = 'block';
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearAllErrors() {
    const errorContainer = document.getElementById('formErrors');
    errorContainer.style.display = 'none';
}

function displaySuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        background: #4caf50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        text-align: center;
    `;
    successMsg.textContent = '✓ Message sent successfully! Thank you for reaching out.';
    
    form.insertBefore(successMsg, form.firstChild);

    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    if (!elements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initializeScrollToTop() {
    const scrollButton = document.getElementById('scrollToTopBtn');

    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}