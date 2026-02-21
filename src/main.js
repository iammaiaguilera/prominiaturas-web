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
// Run after Alpine.start() so dynamically rendered x-for icons are present
document.addEventListener('alpine:initialized', () => {
    initIcons();
});

// ── Animations ───────────────────────────────────────────────────────────────
function startApp() {
    initGalaxyParticles();
    initHeroGrid();
    initHeroSlider();
    initInteractiveBubble();
    initRevealAnimations();
    initFooterStars();
}

// Module scripts are deferred by default — run immediately
startApp();

// Re-scan reveal targets after Alpine renders x-for loops
document.addEventListener('alpine:initialized', () => {
    setTimeout(() => initRevealAnimations(), 100);
});

// Fallback for any remaining load-timing edge cases
window.addEventListener('load', startApp);
