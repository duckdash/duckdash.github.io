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
