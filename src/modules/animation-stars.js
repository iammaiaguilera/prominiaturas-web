/**
 * @module animation-stars
 * Generates CSS-animated star elements inside the footer #stars container.
 */

export function initFooterStars() {
    const starContainer = document.getElementById('stars');
    if (!starContainer) return;

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
