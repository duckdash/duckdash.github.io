async function loadNews() {
    try {
        const response = await fetch('news.json');
        
        if (!response.ok) {
            console.error("File not found! Error code:", response.status);
            return;
        }

        const data = await response.json();
        const ticker = document.getElementById('ticker-text');
        
        if (ticker && data.headlines && data.headlines.length > 0) {
            ticker.innerText = data.headlines.join("  |  ");
        }
    } catch (error) {
        console.error("DETAILED ERROR:", error);
        const ticker = document.getElementById('ticker-text');
        if (ticker) ticker.innerText = "News not loading.";
    }
}

loadNews();

const world = document.getElementById('game-world');
const duck = document.getElementById('player-duck');

let moveInterval;
const speed = 4; 

if (world && duck) {
    world.addEventListener('mousedown', (e) => {
        clearInterval(moveInterval);

        const rect = world.getBoundingClientRect();
        const targetX = e.clientX - rect.left;
        const targetY = e.clientY - rect.top;

        function move() {
            const currentX = parseFloat(duck.style.left) || 50;
            const currentY = parseFloat(duck.style.top) || 50;

            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
                duck.style.left = `${targetX}px`;
                duck.style.top = `${targetY}px`;
                clearInterval(moveInterval);
                return;
            }

            const velX = (dx / distance) * speed;
            const velY = (dy / distance) * speed;

            duck.style.left = `${currentX + velX}px`;
            duck.style.top = `${currentY + velY}px`;

            if (velX < 0) {
                duck.style.transform = 'translate(-50%, -100%) scaleX(-1)';
            } else {
                duck.style.transform = 'translate(-50%, -100%) scaleX(1)';
            }
        }

        moveInterval = setInterval(move, 20);
    });
}
