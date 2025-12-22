// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {
    // Navbar scroll effect
    initNavbar();
    
    // Smooth scrolling
    initSmoothScroll();
    
    // Practice areas
    renderPracticeAreas();
    
    // Modal functionality
    initModal();
    
    // Scroll reveal animations
    initScrollReveal();
    
    // Form submission
    initForm();
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Practice Areas Data and Rendering
function renderPracticeAreas() {
    const practiceAreas = [
        {
            icon: 'shield-alert',
            title: 'CBP Detentions & Seizures',
            desc: 'Strategic defense against customs detentions and seizure proceedings.'
        },
        {
            icon: 'ban',
            title: 'OFAC & Sanctions',
            desc: 'Navigate complex international sanctions and economic compliance requirements.'
        },
        {
            icon: 'landmark',
            title: 'U.S. Customs',
            desc: 'Comprehensive customs law representation and regulatory compliance counsel.'
        },
        {
            icon: 'package-check',
            title: 'Import Compliance',
            desc: 'Ensure compliant import operations and minimize regulatory risk exposure.'
        },
        {
            icon: 'package-x',
            title: 'Export Compliance',
            desc: 'Navigate export control regulations including EAR, ITAR, and licensing requirements.'
        },
        {
            icon: 'dollar-sign',
            title: 'Tariffs',
            desc: 'Strategic tariff classification, valuation, and duty mitigation strategies.'
        },
        {
            icon: 'container',
            title: 'Supply Chain',
            desc: 'Optimize compliant global supply chains and mitigate trade disruptions.'
        },
        {
            icon: 'truck',
            title: 'Transportation',
            desc: 'Legal counsel for freight, logistics, and international shipping matters.'
        },
        {
            icon: 'building-2',
            title: 'Commercial Banking',
            desc: 'Trade finance, letters of credit, and international banking law guidance.'
        },
        {
            icon: 'briefcase',
            title: 'General Corporate Counsel',
            desc: 'Business contracts, commercial transactions, and strategic legal support.'
        },
        {
            icon: 'graduation-cap',
            title: 'Policies & Training',
            desc: 'Develop robust compliance programs and train your team on trade regulations.'
        }
    ];

    const grid = document.querySelector('.practices-grid');
    
    practiceAreas.forEach((area, index) => {
        const card = document.createElement('div');
        card.className = 'practice-card reveal-up';
        card.style.transitionDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <i data-lucide="${area.icon}" class="practice-icon" stroke-width="1.5"></i>
            <h4 class="practice-title">${area.title}</h4>
            <p class="practice-desc">${area.desc}</p>
            <i data-lucide="arrow-right" class="practice-arrow"></i>
        `;
        
        grid.appendChild(card);
    });
    
    // Re-initialize icons for dynamically added content
    lucide.createIcons();
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('bioModal');
    const bioBtn = document.getElementById('bioBtn');
    const closeModal = document.getElementById('closeModal');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Open modal
    bioBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Re-initialize icons in modal
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    });
    
    // Close modal
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    overlay.addEventListener('click', closeModalFunc);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-down, .reveal-left, .reveal-right'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Form Submission
function initForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        form.reset();
    });
}

// Utility function to handle image loading errors
function handleImageError(img) {
    const errorSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
    
    img.onerror = null;
    img.src = errorSvg;
    img.alt = 'Image failed to load';
}

// Add error handling to all images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => handleImageError(img));
});