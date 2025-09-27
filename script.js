// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and timeline items
document.querySelectorAll('.feature-card, .timeline-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add CSS for observed elements
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards !important;
    }
    @keyframes fadeIn {
        to {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) {
            this.classList.add('loading');
            this.innerHTML = '<span>Loading...</span>';
        }
    });
});

// Preload images for better performance
const imagesToPreload = [
    'app-preview.png',
    'emilio.jpg',
    'app-store-badge.svg'
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile responsive navigation
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const mobileMenuHTML = `
        <div class="mobile-menu">
            <div class="mobile-menu-content">
                <a href="#features">Features</a>
                <a href="#program">Program</a>
                <a href="#pricing">Pricing</a>
                <a href="#download" class="mobile-cta">Download</a>
            </div>
        </div>
    `;

    // Add mobile menu styles
    const mobileStyles = `
        .nav-links.active {
            display: flex;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-mobile-toggle.active span:nth-child(2) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: -100%;
                transition: all 0.3s ease;
            }

            .nav-links.active {
                top: 64px;
            }
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = mobileStyles;
    document.head.appendChild(styleElement);
};

// Initialize mobile menu
createMobileMenu();

// Track scroll position for progress indicator
const createProgressIndicator = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #007AFF 0%, #0051D5 100%);
        transition: width 0.1s ease;
        z-index: 10000;
        width: 0%;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        progress.style.width = scrolled + '%';
    });
};

// Initialize progress indicator
createProgressIndicator();

// Console easter egg
console.log('%c🏋️ Welcome to Reto Born!', 'font-size: 20px; font-weight: bold; color: #007AFF;');
console.log('%cTransform your body, transform your life.', 'font-size: 14px; color: #666;');
console.log('%cBuilt with dedication by Emilio Born Fitness', 'font-size: 12px; color: #999;');