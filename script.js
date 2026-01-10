async function loadNews() {
    try {
        const response = await fetch('news.json');
        if (!response.ok) return;

        const data = await response.json();
        const ticker = document.getElementById('ticker-text');

        if (!ticker || !data.headlines?.length) return;

        let index = 0;

        const updateHeadline = () => {
            ticker.classList.remove('fade-in');
            ticker.classList.add('fade-out');

            setTimeout(() => {
                ticker.innerText = data.headlines[index];
                ticker.classList.remove('fade-out');
                ticker.classList.add('fade-in');

                index = (index + 1) % data.headlines.length;
            }, 500);
        };

        updateHeadline();
        setInterval(updateHeadline, 5000);
    } catch (err) {
        console.error('error loading news:', err);
    }
}

loadNews();

const world = document.getElementById('game-world');
const duck = document.getElementById('player-duck');

const speed = 4;
let moveInterval = null;

if (world && duck) {
    duck.style.position = 'absolute';

    world.addEventListener('mousedown', (e) => {
        clearInterval(moveInterval);

        const worldRect = world.getBoundingClientRect();
        const targetX = e.clientX - worldRect.left;
        const targetY = e.clientY - worldRect.top;

        function move() {
            const duckRect = duck.getBoundingClientRect();

            const currentX = duckRect.left - worldRect.left;
            const currentY = duckRect.top - worldRect.top;

            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const distance = Math.hypot(dx, dy);

            if (distance <= speed) {
                duck.style.left = `${targetX}px`;
                duck.style.top = `${targetY}px`;
                clearInterval(moveInterval);
                moveInterval = null;
                return;
            }

            const velX = (dx / distance) * speed;
            const velY = (dy / distance) * speed;

            duck.style.left = `${currentX + velX}px`;
            duck.style.top = `${currentY + velY}px`;

            duck.style.transform =
                velX < 0
                    ? 'translate(-50%, -100%) scaleX(-1)'
                    : 'translate(-50%, -100%) scaleX(1)';
        }

        moveInterval = setInterval(move, 20);
    });
}
