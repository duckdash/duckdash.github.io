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

let posX = 0;
let posY = 0;
let targetX = 0;
let targetY = 0;
let moving = false;

if (world && duck) {
    world.style.position = 'relative';
    duck.style.position = 'absolute';

    // initialize position once
    const worldRect = world.getBoundingClientRect();
    const duckRect = duck.getBoundingClientRect();

    posX = duckRect.left - worldRect.left;
    posY = duckRect.top - worldRect.top;

    duck.style.left = `${posX}px`;
    duck.style.top = `${posY}px`;

    world.addEventListener('mousedown', (e) => {
        const rect = world.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        moving = true;
    });

    function move() {
        if (!moving) return;

        const dx = targetX - posX;
        const dy = targetY - posY;
        const distance = Math.hypot(dx, dy);

        if (distance <= speed) {
            posX = targetX;
            posY = targetY;
            moving = false;
        } else {
            posX += (dx / distance) * speed;
            posY += (dy / distance) * speed;
        }

        duck.style.left = `${posX}px`;
        duck.style.top = `${posY}px`;

        duck.style.transform =
            dx < 0
                ? 'translate(-50%, -100%) scaleX(-1)'
                : 'translate(-50%, -100%) scaleX(1)';

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
}
