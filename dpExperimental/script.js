const newsData = {
  "headlines": [
    "haha yay news",
  ]
};

function loadNews() {
    const ticker = document.getElementById('ticker-text');
    if (newsData.headlines && newsData.headlines.length > 0) {
        ticker.innerText = newsData.headlines.join("  •  ");
    }
}

document.querySelector('.play-button').addEventListener('click', () => {
    console.log("Loading Duck Dash...");
});

loadNews();