/**
 * @file main.js
 * Entry point — bootstraps Alpine.js and all site features.
 *
 * Architecture: each concern lives in its own module under src/modules/.
 * This file is responsible ONLY for:
 *   1. Wiring Alpine plugins + stores + data components
 *   2. Calling animation initialisers in the correct order
 *   3. Handling timing (DOMContentLoaded, alpine:initialized, load)
 */

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import collapse from '@alpinejs/collapse';

// Feature modules
import { registerLangStore } from './modules/store-lang.js';
import { registerAppData } from './modules/alpine-app.js';
import { initIcons } from './modules/icons.js';
import { initGalaxyParticles } from './modules/animation-galaxy.js';
import { initFooterStars } from './modules/animation-stars.js';
import { initRevealAnimations } from './modules/animation-reveal.js';
import { initHeroGrid } from './modules/animation-hero-grid.js';
import { initHeroSlider } from './modules/animation-hero-slider.js';
import { initInteractiveBubble } from './modules/animation-bubble.js';

// ── Alpine setup ─────────────────────────────────────────────────────────────
Alpine.plugin(intersect);
Alpine.plugin(collapse);

document.addEventListener('alpine:init', () => {
    registerLangStore(Alpine);
    registerAppData(Alpine);
});

window.Alpine = Alpine;
Alpine.start();

// ── Lucide icons ─────────────────────────────────────────────────────────────
window.initIcons = initIcons;

// Multi-pass icon initialization to capture everything
function refreshIcons(delay = 0) {
    if (delay > 0) {
        setTimeout(() => window.initIcons(), delay);
    } else {
        window.initIcons();
    }
}

// ── Animations ───────────────────────────────────────────────────────────────
function startApp() {
    initGalaxyParticles();
    initHeroGrid();
    initHeroSlider();
    initInteractiveBubble();
    initRevealAnimations();
    initFooterStars();

    // First pass
    refreshIcons();
}

// Module scripts are deferred by default — run immediately
startApp();

// Second and third pass for reliability with Alpine's dynamic DOM
document.addEventListener('alpine:initialized', () => {
    refreshIcons(100);
    refreshIcons(500); // Fail-safe for slower renders
});

// Final pass on full page load
window.addEventListener('load', () => {
    refreshIcons(200);
});
