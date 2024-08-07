const socket = io("http://localhost:3000");

socket.on("user-join", (quantity) => {
  document.getElementById(
    "users-quantity"
  ).innerText = `Online Users : ${quantity} `;

  if (quantity > 1) {
    createOnlineUserCursor();
  }
});

function createOnlineUserCursor() {
  cursor = `<img id="onine_user_cursor" src="img/cursor.png" alt="cursor" class="cursor"/>`;
  document.body.innerHTML += cursor;
}

socket.on("user-leave", (quantity) => {
  document.getElementById(
    "users-quantity"
  ).innerText = `Online Users : ${quantity} `;
});

window.addEventListener("mousemove", (data) => {
  const { clientX, clientY } = data;

  sendMousePosition(clientX, clientY);
});

function sendMousePosition(x, y) {
  const mousePositions = { x, y };
  socket.emit("mouse-move", mousePositions);
}

socket.on("mouse-move", (data) => {
  console.log("someone is moving mouse", data);
  onlineMouseMove(data.x, data.y);
});

function onlineMouseMove(x, y) {
  const cursor = document.getElementById("onine_user_cursor");
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
}
