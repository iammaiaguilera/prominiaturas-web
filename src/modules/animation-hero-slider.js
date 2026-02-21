/**
 * @module animation-hero-slider
 * 3D fan-roulette infinite slider for the hero section.
 * Supports mouse drag and touch swipe.
 */

export function initHeroSlider() {
    const track = document.getElementById('hero-slider-track');
    const container = document.getElementById('hero-slider-container');
    if (!track || !container) return;

    const images = [
        '/thumbnails/essential-25.jpg', '/thumbnails/essential-26.jpg', '/thumbnails/essential-6.jpg',
        '/thumbnails/essential-10.jpg', '/thumbnails/essential-30.jpg', '/thumbnails/essential-38.jpg',
        '/thumbnails/essential-33.jpg', '/thumbnails/essential-24.jpg', '/thumbnails/essential-18.jpg',
        '/thumbnails/essential-1.jpg', '/thumbnails/essential-2.jpg', '/thumbnails/essential-3.jpg'
    ];

    track.innerHTML = '';
    const cards = [];
    images.forEach(src => {
        const div = document.createElement('div');
        div.className = 'hero-card';
        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
        track.appendChild(div);
        cards.push(div);
    });

    let progress = 4;
    let targetProgress = 4;
    let isDown = false;
    let isHovered = false;
    let startX = 0;
    let startProgress = 0;

    const AUTO_SPEED = 0.002;
    const CARD_SPACING = 0.55; // eslint-disable-line no-unused-vars
    const DRAG_SPEED = 0.003;

    function render() {
        if (!isDown && !isHovered) {
            targetProgress += AUTO_SPEED;
        }
        progress += (targetProgress - progress) * 0.08;

        cards.forEach((card, i) => {
            const total = cards.length;
            let pos = (i - progress) % total;
            if (pos < -total / 2) pos += total;
            if (pos > total / 2) pos -= total;

            if (Math.abs(pos) > 4) {
                card.style.display = 'none';
                return;
            }
            card.style.display = 'block';

            const dist = Math.abs(pos);
            const xOffset = pos * 350;
            const scale = 1 - dist * 0.15;
            const rotate = pos * 15;
            const yArch = Math.abs(pos * pos) * 10;
            const blur = dist * 4;
            const zIndex = 100 - Math.round(dist * 10);

            card.style.transform = `translateX(${xOffset}px) translateY(${yArch}px) scale(${Math.max(0, scale)}) rotate(${rotate}deg)`;
            card.style.zIndex = zIndex;
            card.style.filter = `blur(${blur}px)`;
            card.style.opacity = 1 - dist * 0.15;

            if (dist < 0.3) {
                card.style.borderColor = 'var(--green)';
                card.style.boxShadow = '0 0 50px var(--green)';
            } else {
                card.style.borderColor = 'rgba(255,255,255,0.1)';
                card.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
            }
        });

        requestAnimationFrame(render);
    }
    render();

    // Mouse
    container.addEventListener('mouseenter', () => isHovered = true);
    container.addEventListener('mouseleave', () => isHovered = false);

    container.addEventListener('mousedown', e => {
        isDown = true;
        e.preventDefault();
        startX = e.clientX;
        startProgress = targetProgress;
        container.classList.add('active');
    });

    window.addEventListener('mousemove', e => {
        if (!isDown) return;
        targetProgress = startProgress - (e.clientX - startX) * DRAG_SPEED;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    // Touch
    container.addEventListener('touchstart', e => {
        isDown = true;
        startX = e.touches[0].clientX;
        startProgress = targetProgress;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
        if (!isDown) return;
        targetProgress = startProgress - (e.touches[0].clientX - startX) * DRAG_SPEED;
    }, { passive: false });

    window.addEventListener('touchend', () => { isDown = false; });
}
