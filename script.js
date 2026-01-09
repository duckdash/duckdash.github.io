async function loadNews() {
    try {
        const response = await fetch('news.json');
        if (!response.ok) return;

        const data = await response.json();
        const ticker = document.getElementById('ticker-text');
        
        if (ticker && data.headlines && data.headlines.length > 0) {
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
        }
    } catch (error) {
        console.error("Error loading news:", error);
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
        const currentX = parseFloat(duck.style.left) || 400;
        const currentY = parseFloat(duck.style.top) || 300;

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

        duck.style.transform = velX < 0 ? 'translate(-50%, -100%) scaleX(-1)' : 'translate(-50%, -100%) scaleX(1)';
    }

    moveInterval = setInterval(move, 20);
});
