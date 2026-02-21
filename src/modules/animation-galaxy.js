/**
 * @module animation-galaxy
 * Canvas-based star/galaxy particle animation for the hero section.
 */

export function initGalaxyParticles() {
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
            this.reset(true);
        }
        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : height + Math.random() * 100;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random();
            this.fade = 0.01;
        }
        update() {
            this.y -= this.speed;
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
