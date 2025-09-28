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

// Navegación simplificada - no menu necesario con diseño minimalista

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