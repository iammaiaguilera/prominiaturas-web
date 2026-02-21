/**
 * @module animation-hero-grid
 * Builds the mouse-reactive grid overlay on the hero section and
 * handles the hover highlight + trail-decay effect.
 */

export function initHeroGrid() {
    const gridContainer = document.getElementById('desktop-only-grid');
    if (!gridContainer) return;

    function createGrid() {
        gridContainer.style.display = 'grid';
        gridContainer.innerHTML = '';
        const width = gridContainer.offsetWidth;
        const height = gridContainer.offsetHeight;
        const boxSize = 30;
        const cols = Math.ceil(width / boxSize);
        const rows = Math.ceil(height / boxSize);

        gridContainer.style.setProperty('--cols', cols);
        gridContainer.style.setProperty('--rows', rows);

        const totalBoxes = cols * rows;
        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('hero-grid-cell');
            gridContainer.appendChild(box);
        }
    }

    createGrid();

    window.addEventListener('resize', () => {
        createGrid();
        if (typeof window.enforceHeroVisibility === 'function') window.enforceHeroVisibility();
    });

    let lastIndex = -1;
    const cellTimeouts = new Map();

    window.addEventListener('mousemove', (e) => {
        const container = document.getElementById('desktop-only-grid');
        if (!container) return;

        const rect = container.getBoundingClientRect();

        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const boxSize = 30;
            const col = Math.floor(x / boxSize);
            const row = Math.floor(y / boxSize);
            const cols = Math.ceil(rect.width / boxSize);
            const index = col + row * cols;
            const cells = container.children;

            if (cells[index]) {
                const currentCell = cells[index];
                currentCell.classList.add('active');

                if (cellTimeouts.has(index)) {
                    clearTimeout(cellTimeouts.get(index));
                    cellTimeouts.delete(index);
                }

                if (lastIndex !== -1 && lastIndex !== index) {
                    const prevCell = cells[lastIndex];
                    if (prevCell) {
                        if (cellTimeouts.has(lastIndex)) clearTimeout(cellTimeouts.get(lastIndex));
                        const timeoutId = setTimeout(() => {
                            prevCell.classList.remove('active');
                            cellTimeouts.delete(lastIndex);
                        }, 150);
                        cellTimeouts.set(lastIndex, timeoutId);
                    }
                }
                lastIndex = index;
            }
        } else {
            if (lastIndex !== -1) {
                const cells = container.children;
                const prevCell = cells[lastIndex];
                if (prevCell) {
                    if (cellTimeouts.has(lastIndex)) clearTimeout(cellTimeouts.get(lastIndex));
                    const timeoutId = setTimeout(() => {
                        prevCell.classList.remove('active');
                        cellTimeouts.delete(lastIndex);
                    }, 150);
                    cellTimeouts.set(lastIndex, timeoutId);
                }
                lastIndex = -1;
            }
        }
    });

    // Debounced resize re-create
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createGrid, 100);
    });
}
