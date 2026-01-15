import { createIcons, Zap, RefreshCw, ShieldCheck, Target, Mail, Phone, X, ChevronDown, ArrowDown, ArrowUp, Instagram, Facebook, Clapperboard } from 'lucide';
import Alpine from 'alpinejs';

// --- GALAXY ANIMATION ---
function initGalaxyParticles() {
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initStars();
    }
    window.addEventListener('resize', resize);

    class Star {
        constructor() {
            this.reset(true); // true = random initial pos
        }
        reset(initial = false) {
            this.x = initial ? Math.random() * width : Math.random() * width;
            this.y = initial ? Math.random() * height : height + Math.random() * 100;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random();
            this.fade = 0.01;
        }
        update() {
            this.y -= this.speed; // Move up
            this.opacity += this.fade;
            if (this.opacity >= 1 || this.opacity <= 0) this.fade = -this.fade;

            if (this.y < -50) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        const count = (width * height) / 4000;
        for (let i = 0; i < count; i++) stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }

    resize();
    animate();
}

// Ensure elements created by Alpine (like x-for loops) are ready before observing

// Initialize Alpine data
Alpine.data('app', () => ({
    galleryTab: 'essential',
    lightboxOpen: false,
    activeImg: '',
    inquiry: '',
    openKontigo(amountUsd, planName) {
        const slug = 'ee782fe5-2c70-4744-a0ed-43467de5468a';
        const amountCents = amountUsd * 100;
        const url = `https://app.kontigo.lat/pay/${slug}?amount=${amountCents}&redirect_url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    },
    setInquiry(plan) {
        this.inquiry = `Hi! I'm interested on ${plan} plan, please send over the invoice link so I'm paying asap`;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    },
    formSuccess: false,
    async submitForm(e) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxwdg2d1ePxuDUB2AsDA-AuhmsWCLW3j574BV7UXg2NCWC_V0g6woOy4wc0AWYHy1N_/exec';
        const form = e.target;
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = "SENDING...";

        try {
            await fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' });
            this.formSuccess = true;
            form.reset();
            this.inquiry = '';
        } catch (error) {
            console.error('Error!', error.message);
            alert("Error sending message. Please contact us via email.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    },
    pricingMode: 'essential',
    init() {
        // Pricing scroll trigger
        window.addEventListener('scroll', () => {
            const proSection = document.getElementById('pro-plans');
            if (proSection) {
                const rect = proSection.getBoundingClientRect();
                const triggerPoint = window.innerHeight / 1.5;
                if (rect.top <= triggerPoint) {
                    this.pricingMode = 'pro';
                } else {
                    this.pricingMode = 'essential';
                }
            }
        });
    },
    limit: 9,
    essentialImages: [
        '/thumbnails/essential-25.jpg',
        '/thumbnails/essential-26.jpg',
        '/thumbnails/essential-6.jpg',
        '/thumbnails/essential-10.jpg',
        '/thumbnails/essential-30.jpg',
        '/thumbnails/essential-38.jpg',
        '/thumbnails/essential-33.jpg',
        '/thumbnails/essential-24.jpg',
        '/thumbnails/essential-18.jpg',
        // Remaining images (1-39 excluding above)
        '/thumbnails/essential-1.jpg',
        '/thumbnails/essential-2.jpg',
        '/thumbnails/essential-3.jpg',
        '/thumbnails/essential-4.jpg',
        '/thumbnails/essential-5.jpg',
        '/thumbnails/essential-7.jpg',
        '/thumbnails/essential-8.jpg',
        '/thumbnails/essential-9.jpg',
        '/thumbnails/essential-11.jpg',
        '/thumbnails/essential-12.jpg',
        '/thumbnails/essential-13.jpg',
        '/thumbnails/essential-14.jpg',
        '/thumbnails/essential-15.jpg',
        '/thumbnails/essential-16.jpg',
        '/thumbnails/essential-17.jpg',
        '/thumbnails/essential-19.jpg',
        '/thumbnails/essential-20.jpg',
        '/thumbnails/essential-21.jpg',
        '/thumbnails/essential-22.jpg',
        '/thumbnails/essential-23.jpg',
        '/thumbnails/essential-27.jpg',
        '/thumbnails/essential-28.jpg',
        '/thumbnails/essential-29.jpg',
        '/thumbnails/essential-31.jpg',
        '/thumbnails/essential-32.jpg',
        '/thumbnails/essential-34.jpg',
        '/thumbnails/essential-35.jpg',
        '/thumbnails/essential-36.jpg',
        '/thumbnails/essential-37.jpg',
        '/thumbnails/essential-39.jpg'
    ]
}));

window.Alpine = Alpine;
Alpine.start();

// Initialize Lucide Icons
createIcons({
    icons: {
        Zap,
        RefreshCw,
        ShieldCheck,
        Target,
        Mail,
        Phone,
        X,
        ChevronDown,
        ArrowDown,
        ArrowUp,
        Instagram,
        Facebook,
        Clapperboard
    }
});

// Star animation (Footer)
document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('stars');
    if (starContainer) {
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starContainer.appendChild(star);
        }
    }
});

// --- REVEAL ANIMATIONS (BLUR ON SCROLL) ---
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-blur');
    elements.forEach(el => observer.observe(el));
}
window.initRevealAnimations = initRevealAnimations;

// --- HERO GRID INTERACTION (SQUARES) ---
function initHeroGrid() {
    const gridContainer = document.getElementById('hero-grid');
    if (!gridContainer) return;

    function createGrid() {
        gridContainer.innerHTML = ''; // Clear existing
        const width = gridContainer.offsetWidth;
        const height = gridContainer.offsetHeight;

        const boxSize = 20; // Size of each square in px

        const cols = Math.ceil(width / boxSize);
        const rows = Math.ceil(height / boxSize);

        gridContainer.style.setProperty('--cols', cols);
        gridContainer.style.setProperty('--rows', rows);

        const totalBoxes = cols * rows;

        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('hero-grid-cell');
            box.style.width = `${boxSize}px`;
            box.style.height = `${boxSize}px`;
            gridContainer.appendChild(box);
        }
    }

    // Debounce resize
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(createGrid, 100);
    });

    // Initial create
    createGrid();
}

// --- INTERACTIVE BUBBLE (FAQ) ---
function initInteractiveBubble() {
    const interBubble = document.querySelector('.interactive');
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
}

// Ensure elements created by Alpine (like x-for loops) are ready before observing
// --- INITIALIZATION ORCHESTRATION ---
function startApp() {
    initHeroGrid();
    initGalaxyParticles(); // New galaxy
    initRevealAnimations();
    initInteractiveBubble();
}

// 1. Run immediately (Module scripts defer automatically)
startApp();

// 2. Re-run animations after Alpine renders dynamic content (loops)
document.addEventListener('alpine:initialized', () => {
    setTimeout(() => {
        initRevealAnimations(); // Re-scan for new elements
    }, 100);
});

// 3. Fallback for any other load timing issues
window.addEventListener('load', startApp);
