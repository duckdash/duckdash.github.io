function joinServer(serverName) {
  console.log("Connecting to " + serverName + "...");

  const menu = document.getElementById("server-menu");
  if (menu) {
    menu.style.display = "none";
    alert("Joined " + serverName + "!");
  }

}
