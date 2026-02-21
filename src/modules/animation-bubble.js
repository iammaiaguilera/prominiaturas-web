/**
 * @module animation-bubble
 * Smooth-following cursor bubble for the FAQ gradient background.
 */

export function initInteractiveBubble() {
    const interBubble = document.querySelector('.interactive');
    if (!interBubble) return;

    let curX = 0, curY = 0, tgX = 0, tgY = 0;

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
