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

// Navbar background on scroll
const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
        }
    });
}

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();

    // Add fade-in animations to hero elements
    document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3').forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 100);
    });
});

// Create mobile menu toggle functionality
const createMobileNav = () => {
    const navContainer = document.querySelector('.nav-content');
    if (!navContainer) return;

    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'mobile-toggle';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
        padding: 10px;
        z-index: 1001;
    `;

    // Add hamburger styles for mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-toggle {
                display: flex !important;
            }

            .mobile-toggle span {
                width: 25px;
                height: 2px;
                background: var(--text-primary);
                transition: all 0.3s;
                border-radius: 2px;
            }

            .mobile-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .mobile-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }

            .nav-links {
                position: fixed;
                top: -100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 80px 20px 40px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                transition: top 0.3s;
            }

            .nav-links.active {
                top: 0;
                display: flex !important;
            }

            .nav-link {
                padding: 15px;
                font-size: 18px;
            }

            .btn-download-nav {
                margin-top: 20px;
                width: 100%;
                text-align: center;
                padding: 15px 30px;
            }
        }
    `;
    document.head.appendChild(style);

    navContainer.appendChild(hamburger);

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link, .btn-download-nav').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
};

// Initialize mobile navigation
createMobileNav();

// Preload images for better performance
const preloadImages = () => {
    const images = [
        'screenshots/screen1.jpg',
        'screenshots/screen2.jpg',
        'screenshots/screen3.jpg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();

// Create scroll progress indicator
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #007AFF, #FF2D55);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createProgressBar();

// Console branding
console.log('%c🏋️ Reto Born', 'font-size: 24px; font-weight: bold; color: #007AFF;');
console.log('%cTransforma tu cuerpo en 4 semanas', 'font-size: 14px; color: #666;');
console.log('%c💪 Con Emilio Born', 'font-size: 12px; color: #999;');