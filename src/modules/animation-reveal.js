/**
 * @module animation-reveal
 * IntersectionObserver that adds the `active` class to `.reveal-blur` elements
 * as they scroll into view (animates once, never removes on scroll-up).
 *
 * Also exposed as `window.initRevealAnimations` so Alpine inline calls
 * like `$nextTick(() => window.initRevealAnimations())` continue to work.
 */

export function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
            // 'else' disabled intentionally — animate once to prevent scroll-up glitch
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-blur').forEach(el => observer.observe(el));
}

// Expose globally so Alpine @click handlers can call window.initRevealAnimations()
window.initRevealAnimations = initRevealAnimations;
