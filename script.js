// Apple 2030 - Ultra Minimal Interactions

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic navigation behavior
const nav = document.querySelector('.nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.backdropFilter = 'blur(30px) saturate(180%)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.72)';
        nav.style.backdropFilter = 'blur(20px) saturate(180%)';
    }

    lastScrollY = currentScrollY;
});

// Scroll Reveal Animation with Stagger
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        scrollObserver.observe(element);
    });

    // Hero animations
    const heroElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Mobile Menu - Ultra Minimal
const createMobileMenu = () => {
    const navContent = document.querySelector('.nav-content');
    if (!navContent) return;

    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.setAttribute('aria-label', 'Menu');
    menuButton.innerHTML = `
        <span></span>
        <span></span>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            padding: 8px;
            cursor: pointer;
            z-index: 10000;
        }

        .mobile-menu-button span {
            display: block;
            width: 18px;
            height: 1.5px;
            background: var(--pure-black);
            margin: 4px 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: center;
        }

        .mobile-menu-button.active span:first-child {
            transform: rotate(45deg) translate(3px, 3px);
        }

        .mobile-menu-button.active span:last-child {
            transform: rotate(-45deg) translate(3px, -3px);
        }

        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }

            .nav-links {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(30px);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 32px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
            }

            .nav-links.active {
                opacity: 1;
                pointer-events: all;
            }

            .nav-link {
                font-size: 24px;
                font-weight: 300;
                letter-spacing: -0.02em;
            }

            .btn-download-nav {
                font-size: 18px;
                padding: 14px 40px;
            }
        }
    `;
    document.head.appendChild(style);

    navContent.appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
        document.body.style.overflow = menuButton.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link, .btn-download-nav').forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

createMobileMenu();

// Preload critical images
const preloadImages = () => {
    const criticalImages = [
        'screenshots/screen1.jpg',
        'screenshots/screen2.jpg',
        'screenshots/screen3.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

preloadImages();

// Subtle parallax effect
const parallaxElements = document.querySelectorAll('.hero-title, .hero-subtitle');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);

        if (Math.abs(yPos) < 200) {
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Performance optimization - Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Minimal console signature
console.log(
    '%cReto Born',
    'font-family: -apple-system; font-size: 14px; font-weight: 600; color: #000000;'
);
console.log(
    '%cDesigned in California',
    'font-family: -apple-system; font-size: 11px; color: #8E8E93;'
);