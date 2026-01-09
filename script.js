async function loadNews() {
    try {
        const response = await fetch('news.json');
        
        if (!response.ok) {
            console.error("File not found! Error code:", response.status);
            return;
        }

        const data = await response.json();
        const ticker = document.getElementById('ticker-text');
        
        if (data.headlines && data.headlines.length > 0) {
            ticker.innerText = data.headlines.join("  |  ");
        }
    } catch (error) {
        console.error("DETAILED ERROR:", error);
        document.getElementById('ticker-text').innerText = "News not loading.";
    }
}

loadNews();

const world = document.getElementById('game-world');
const duck = document.getElementById('player-duck');

if (world && duck) {
    world.addEventListener('click', (e) => {
        const rect = world.getBoundingClientRect();
        const x = e.clientX - rect.left - (duck.offsetWidth / 2);
        const y = e.clientY - rect.top - (duck.offsetHeight / 2);

        duck.style.left = `${x}px`;
        duck.style.top = `${y}px`;
        
        console.log(`Waddling to: ${x}, ${y}`);
    });
}
