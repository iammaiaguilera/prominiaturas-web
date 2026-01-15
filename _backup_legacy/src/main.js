import './style.css';
import Alpine from 'alpinejs';
import { createIcons, Zap, RefreshCw, ShieldCheck, Target, Mail, Phone, X } from 'lucide';

// Initialize Alpine data
Alpine.data('app', () => ({
    galleryTab: 'pro',
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
            // Using no-cors mode as Google Scripts often redirect, causing opaque responses.
            // This means we won't strictly know if it failed server-side, but it avoids CORS errors blocking the request.
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
    }
}));

window.Alpine = Alpine;
Alpine.start();

// Initialize Lucide Icons
// We need to make sure the library is available globally if we were using the CDN version,
// but in modules we import what we need or use createIcons to scan the DOM.
createIcons({
    icons: {
        Zap,
        RefreshCw,
        ShieldCheck,
        Target,
        Mail,
        Phone,
        X
    }
});

// Star animation
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
