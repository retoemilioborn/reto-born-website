// Apple-inspired smooth interactions

// Falling Text Animation with Particle Effects
function initFallingTextAnimation() {
    const reto = document.getElementById('reto');
    const born = document.getElementById('born');
    const canvas = document.getElementById('smoke-canvas');
    const ctx = canvas.getContext('2d');
    const subtitle = document.querySelector('.hero-subtitle');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 12;
            this.vy = -(Math.random() * 4 + 2);
            this.size = Math.random() * 4 + 2;
            this.life = 1;
            this.decay = Math.random() * 0.01 + 0.008;
            this.color = Math.random() > 0.5 ? '#999' : '#ddd';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.15; // gravity
            this.vx *= 0.98; // friction
            this.life -= this.decay;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life * 0.4;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Create impact particles
    function createImpact(x, y) {
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle(x, y));
        }
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.update();
            particle.draw(ctx);

            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            requestAnimationFrame(animateParticles);
        }
    }

    // Create impact sound
    function playImpact() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create oscillator for low-frequency thump
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.frequency.value = 50;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);

        // Create noise for impact
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.15, audioContext.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = (Math.random() - 0.5) * 0.3;
        }

        const noiseSource = audioContext.createBufferSource();
        const noiseGain = audioContext.createGain();

        noiseSource.buffer = noiseBuffer;
        noiseGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        noiseSource.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseSource.start();
    }

    // Hide elements initially
    gsap.set([reto, born], {
        opacity: 0,
        y: -window.innerHeight,
        scale: 0.8
    });

    // Hide subtitle initially
    gsap.set(subtitle, {
        opacity: 0,
        scale: 0.9
    });

    // RETO falls first
    gsap.to(reto, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power4.in",
        onComplete: () => {
            // Create impact effect
            const rect = reto.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.bottom - 20;
            createImpact(x, y);
            animateParticles();
            playImpact();

            // Small bounce effect
            gsap.to(reto, {
                y: -15,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        }
    });

    // BORN falls after RETO
    gsap.to(born, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.9,
        ease: "power4.in",
        onComplete: () => {
            // Create impact effect
            const rect = born.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.bottom - 20;
            createImpact(x, y);
            animateParticles();
            playImpact();

            // Small bounce effect
            gsap.to(born, {
                y: -15,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Show subtitle with breathing effect
                    gsap.to(subtitle, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => {
                            // Add breathing effect to subtitle
                            gsap.to(subtitle, {
                                scale: 1.02,
                                duration: 2.5,
                                ease: "power1.inOut",
                                yoyo: true,
                                repeat: -1
                            });
                        }
                    });
                }
            });
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

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
    // Initialize falling text animation
    initFallingTextAnimation();

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