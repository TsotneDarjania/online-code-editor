const socket = io("http://localhost:3000");

socket.on("user-join", handleUserJoin);
socket.on("user-leave", updateUserCount);
socket.on("mouse-move", handleMouseMove);

window.addEventListener("mousemove", handleMouseMovement);

function handleUserJoin(quantity) {
  updateUserCount(quantity);
  if (quantity > 1 && !document.getElementById("online_user_cursor")) {
    createOnlineUserCursor();
  }
}

function updateUserCount(quantity) {
  document.getElementById(
    "users-quantity"
  ).innerText = `Online Users: ${quantity}`;
}

function handleMouseMovement(event) {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;

  const xPercent = (clientX / innerWidth) * 100;
  const yPercent = (clientY / innerHeight) * 100;

  sendMousePosition(xPercent, yPercent);
}

function sendMousePosition(x, y) {
  socket.emit("mouse-move", { x, y });
}

function createOnlineUserCursor() {
  const cursorHtml = `<img id="online_user_cursor" src="img/cursor.png" alt="cursor" class="cursor"/>`;
  document.body.insertAdjacentHTML("beforeend", cursorHtml);
}

function handleMouseMove(data) {
  onlineMouseMove(data.x, data.y);
}

function onlineMouseMove(xPercent, yPercent) {
  const { innerWidth, innerHeight } = window;

  const x = (xPercent / 100) * innerWidth;
  const y = (yPercent / 100) * innerHeight;

  const cursor = document.getElementById("online_user_cursor");
  if (cursor) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }
}
