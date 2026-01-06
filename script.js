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

    // Business hours
    initBusinessHours();

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

// Business Hours
function initBusinessHours() {
    const hoursToggle = document.getElementById('hoursToggle');
    const hoursDropdown = document.getElementById('hoursDropdown');
    const hoursStatus = document.getElementById('hoursStatus');
    const currentHours = document.getElementById('currentHours');

    if (!hoursToggle || !hoursDropdown) return;

    // Business hours configuration
    const businessHours = {
        0: { day: 'Sun', hours: 'Closed', open: false },      // Sunday
        1: { day: 'Mon', hours: '09:00 am – 05:00 pm', open: true },
        2: { day: 'Tue', hours: '09:00 am – 05:00 pm', open: true },
        3: { day: 'Wed', hours: '09:00 am – 05:00 pm', open: true },
        4: { day: 'Thu', hours: '09:00 am – 05:00 pm', open: true },
        5: { day: 'Fri', hours: '09:00 am – 05:00 pm', open: true },
        6: { day: 'Sat', hours: 'Closed', open: false }       // Saturday
    };

    // Get current day (0 = Sunday, 6 = Saturday)
    const today = new Date().getDay();
    const todayInfo = businessHours[today];

    // Update current status
    if (todayInfo.open) {
        hoursStatus.textContent = 'Open today';
        currentHours.textContent = todayInfo.hours;
    } else {
        hoursStatus.textContent = 'Closed today';
        currentHours.textContent = todayInfo.hours;
    }

    // Highlight today in the dropdown
    const hoursDays = hoursDropdown.querySelectorAll('.hours-day');
    hoursDays.forEach((dayEl, index) => {
        // Map index to day of week (Mon=0 in our list, but Mon=1 in Date)
        const dayMapping = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
        if (dayMapping[index] === today) {
            dayEl.classList.add('today');
        }
    });

    // Toggle dropdown
    hoursToggle.addEventListener('click', () => {
        hoursToggle.classList.toggle('active');
        hoursDropdown.classList.toggle('active');

        // Re-initialize icons after toggle
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!hoursToggle.contains(e.target) && !hoursDropdown.contains(e.target)) {
            hoursToggle.classList.remove('active');
            hoursDropdown.classList.remove('active');
        }
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