// Apple-inspired smooth interactions

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

    if (currentScrollY > 50) {
        nav.style.background = 'rgba(245, 245, 247, 0.98)';
        nav.style.backdropFilter = 'blur(30px) saturate(180%)';
    } else {
        nav.style.background = 'rgba(245, 245, 247, 0.8)';
        nav.style.backdropFilter = 'blur(20px) saturate(180%)';
    }

    lastScrollY = currentScrollY;
});

// Screenshot reveal animation
const screenshotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe all screenshots
    document.querySelectorAll('.screenshot').forEach(screenshot => {
        screenshotObserver.observe(screenshot);
    });

    // Preload images
    const screenshots = ['1.png', '2.png', '3.png', '4.png'];
    screenshots.forEach(filename => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `screenshots/${filename}`;
        document.head.appendChild(link);
    });
});

// Subtle parallax for hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle && scrolled < 500) {
        heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroSubtitle && scrolled < 500) {
        heroSubtitle.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Console signature
console.log(
    '%cReto Born',
    'font-family: -apple-system; font-size: 14px; font-weight: 600; color: #000000;'
);
console.log(
    '%cTransforma tu cuerpo en 4 semanas',
    'font-family: -apple-system; font-size: 11px; color: #8E8E93;'
);