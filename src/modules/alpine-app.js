/**
 * @module alpine-app
 * Alpine.js `app` data component.
 * Manages: gallery tabs, lightbox navigation, contact form, pricing scroll state, testimonial carousel.
 *
 * @param {import('alpinejs').Alpine} Alpine - The Alpine instance (needed for store access in submitForm)
 */

/** @param {import('alpinejs').Alpine} Alpine */
export function registerAppData(Alpine) {
    Alpine.data('app', () => ({
        // ── Gallery / Showroom ──────────────────────────────────────────
        galleryTab: 'essential',
        limit: 9,

        essentialImages: [
            '/thumbnails/essential-25.jpg', '/thumbnails/essential-26.jpg',
            '/thumbnails/essential-6.jpg', '/thumbnails/essential-10.jpg',
            '/thumbnails/essential-30.jpg', '/thumbnails/essential-38.jpg',
            '/thumbnails/essential-33.jpg', '/thumbnails/essential-24.jpg',
            '/thumbnails/essential-18.jpg', '/thumbnails/essential-1.jpg',
            '/thumbnails/essential-2.jpg', '/thumbnails/essential-3.jpg',
            '/thumbnails/essential-4.jpg', '/thumbnails/essential-5.jpg',
            '/thumbnails/essential-7.jpg', '/thumbnails/essential-8.jpg',
            '/thumbnails/essential-9.jpg', '/thumbnails/essential-11.jpg',
            '/thumbnails/essential-12.jpg', '/thumbnails/essential-13.jpg',
            '/thumbnails/essential-14.jpg', '/thumbnails/essential-15.jpg',
            '/thumbnails/essential-16.jpg', '/thumbnails/essential-17.jpg',
            '/thumbnails/essential-19.jpg', '/thumbnails/essential-20.jpg',
            '/thumbnails/essential-21.jpg', '/thumbnails/essential-22.jpg',
            '/thumbnails/essential-23.jpg', '/thumbnails/essential-27.jpg',
            '/thumbnails/essential-28.jpg', '/thumbnails/essential-29.jpg',
            '/thumbnails/essential-31.jpg', '/thumbnails/essential-32.jpg',
            '/thumbnails/essential-34.jpg', '/thumbnails/essential-35.jpg',
            '/thumbnails/essential-36.jpg', '/thumbnails/essential-37.jpg',
            '/thumbnails/essential-39.jpg'
        ],

        /** PRO images — each entry has { final, sketch } */
        proImages: [
            { final: '/thumbnails/pro-1.jpg', sketch: '/thumbnails/pro-1-sketch.png' }
        ],

        // ── Lightbox ────────────────────────────────────────────────────
        lightboxOpen: false,
        activeImg: '',
        isPro: false,
        viewMode: 'final', // 'final' | 'sketch' | 'compare'
        sliderPosition: 50,
        currentImageIndex: 0,
        currentList: 'essential', // 'essential' | 'pro'

        openLightbox(index, type) {
            this.currentList = type;
            this.currentImageIndex = index;
            this.lightboxOpen = true;

            if (type === 'essential') {
                this.activeImg = this.essentialImages[index];
                this.isPro = false;
            } else {
                this.activeImg = this.proImages[index];
                this.isPro = true;
                this.viewMode = 'final';
                this.sliderPosition = 50;
            }
        },

        nextImage() {
            const list = this.currentList === 'essential' ? this.essentialImages : this.proImages;
            this.currentImageIndex = (this.currentImageIndex + 1) % list.length;
            this.activeImg = list[this.currentImageIndex];
        },

        prevImage() {
            const list = this.currentList === 'essential' ? this.essentialImages : this.proImages;
            this.currentImageIndex = (this.currentImageIndex - 1 + list.length) % list.length;
            this.activeImg = list[this.currentImageIndex];
        },

        // ── Misc UI ─────────────────────────────────────────────────────
        mobileMenuOpen: false,

        // ── Pricing ─────────────────────────────────────────────────────
        pricingMode: 'essential',

        // ── Contact form ────────────────────────────────────────────────
        inquiry: '',
        formSuccess: false,
        botField: '', // 🍯 Honeypot antispam field

        setInquiry(plan) {
            const start = Alpine.store('lang').t('select_msg_start');
            const end = Alpine.store('lang').t('select_msg_end');
            this.inquiry = `${start} ${plan} ${end}`;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        },

        async submitForm(e) {
            // Honeypot: reject bots silently
            if (this.botField) {
                console.log('Bot detected. Submission blocked.');
                this.formSuccess = true;
                setTimeout(() => { this.formSuccess = false; }, 5000);
                return;
            }

            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznX7rAhi_sW3mZCMYRDPoAgwj4MS8GfYUbbuw96R42yPldhsFKj0KREotyPr0wOpON/exec';
            const form = e.target;
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.disabled = true;
            btn.innerText = 'SENDING...';

            const formData = new FormData(form);
            formData.append('lang', Alpine.store('lang').current);

            try {
                await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
                this.formSuccess = true;
                form.reset();
                this.inquiry = '';
            } catch (error) {
                console.error('Form submission error:', error.message);
                alert('Error sending message. Please contact us via email.');
            } finally {
                btn.disabled = false;
                btn.innerText = originalText;
            }
        },

        // ── Testimonials ────────────────────────────────────────────────
        testimonials: [
            { key: 'lewis', image: '/lewis.png' },
            { key: 'mitchell', image: '/mitchell.png' },
            { key: 't6', image: '/zach.png' }, // Zach
            { key: 't1', image: '/arsenia.png' }  // Arsenia
        ],
        activeTestimonial: 0,
        testimonialInterval: null,

        startTestimonialLoop() {
            this.testimonialInterval = setInterval(() => {
                this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
            }, 5000);
        },

        stopTestimonialLoop() {
            clearInterval(this.testimonialInterval);
        },

        // ── Lifecycle ───────────────────────────────────────────────────
        init() {
            this.startTestimonialLoop();

            // Switch pricing badge when PRO section scrolls into view
            window.addEventListener('scroll', () => {
                const proSection = document.getElementById('pro-plans');
                if (!proSection) return;
                const { top } = proSection.getBoundingClientRect();
                this.pricingMode = top <= window.innerHeight / 1.5 ? 'pro' : 'essential';
            });
        },

        // ── Kontigo payment helper ──────────────────────────────────────
        openKontigo(amountUsd) {
            const slug = 'ee782fe5-2c70-4744-a0ed-43467de5468a';
            const amountCents = amountUsd * 100;
            const url = `https://app.kontigo.lat/pay/${slug}?amount=${amountCents}&redirect_url=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
        }
    }));
}
