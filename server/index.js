const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("join", ({ name, room }, callback) => {
    console.log(`${name} and ${room}`);
    const { error, user } = addUser({ id: socket.id, name: name, room: room });
    if (error) return callback(error);

    console.log(`user: ${user}`);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });
    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user?.room).emit("message", { user: user?.name, text: message });
    console.log("back");

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user just disconnected");
  });
});

app.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
