async function loadNews() {
    try {
        const response = await fetch('./news.json');
        
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
        document.getElementById('ticker-text').innerText = "News currently unavailable.";
    }
}

loadNews();
