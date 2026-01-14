const duck = document.getElementById("player-duck");
const world = document.getElementById("game-world");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send-btn");

world.addEventListener("click", (e) => {
  if (e.target.closest(".dd-taskbar-container")) return;

  const targetX = e.clientX - duck.offsetWidth / 2;
  const targetY = e.clientY - duck.offsetHeight / 2;

  const currentX = duck.offsetLeft;
  const currentY = duck.offsetTop;
  const deltaX = targetX - currentX;
  const deltaY = targetY - currentY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const speed = 3;
  const travelTime = distance * speed;

  duck.style.transition = `all ${travelTime}ms linear`;
  duck.style.left = targetX + "px";
  duck.style.top = targetY + "px";

  if (targetX > currentX) {
    duck.style.transform = "scaleX(-1)";
  } else {
    duck.style.transform = "scaleX(1)";
  }
});

function sendChat() {
  const text = chatInput.value.trim();
  if (text === "") return;

  const oldBubble = duck.querySelector(".speech-bubble");
  if (oldBubble) oldBubble.remove();

  const bubble = document.createElement("div");
  bubble.className = "speech-bubble";
  bubble.innerText = text;

  duck.appendChild(bubble);
  chatInput.value = "";

  setTimeout(() => {
    if (bubble.parentNode === duck) {
      bubble.remove();
    }
  }, 5000);
}
sendBtn.addEventListener("click", sendChat);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendChat();
});
chatInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
