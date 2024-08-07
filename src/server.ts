import express from "express";
import pageRouter from "./routes/pageRouter";
import htpp from "http";
import { Server } from "socket.io";

const app = express();
const server = htpp.createServer(app);
const socketServer = new Server(server);

let usersNumber = 0;

socketServer.on("connection", (socket) => {
  usersNumber++;
  console.log("A user connected");

  socketServer.emit("user-join", usersNumber);

  // Listen for mouse move event
  socket.on("mouse-move", (data) => {
    socket.broadcast.emit("mouse-move", data);
  });

  socket.on("disconnect", () => {
    usersNumber--;
    socketServer.emit("user-leave", usersNumber);

    console.log("A user disconnected");
  });
});

app.set("view engine", "ejs");
app.set("views", "views");

//Config
app.use(express.static("static"));
app.use(pageRouter);

export function startServer() {
  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}
