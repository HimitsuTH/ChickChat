const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173/" });

let onlineUsers = [];

io.on("connection", (socket) => {
  //   console.log("connection", socket.id);
  //   console.log("online users: ", onlineUsers);

  //listen connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const recipientId = message.userId;

    const user = onlineUsers.find((user) => user.userId === recipientId);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("createChat", (chat, recipient) => {
    const user = onlineUsers.find((user) => user.userId === recipient.userId);

    if (user) {
      io.to(user.socketId).emit("getChat", chat);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
