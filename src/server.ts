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

  socket.emit("user-join", usersNumber);

  socket.on("disconnect", () => {
    usersNumber--;
    socket.emit("user-leave", usersNumber);

    console.log("A user disconnected");
  });
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(pageRouter);

export function startServer() {
  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}
