module.exports = function (io) {
  let connectedUsers = 0;

  io.on("connection", (socket) => {
    console.log("A user connected");
    connectedUsers++;
    io.emit("noOfConnections", connectedUsers);

    socket.on("disconnect", () => {
      console.log("User disconnected");
      // Emit the 'leaved' event here
      socket.broadcast.emit("leaved", socket.username); // Assuming you store the username in the socket object
      connectedUsers--;
      io.emit("noOfConnections", connectedUsers);
    });

    socket.on("chat-message", (msg) => {
      io.emit("chat-message", msg);
    });

    socket.on("joined", (name) => {
      io.emit("joined", name); // Change to io.emit() to broadcast to all sockets
    });

    socket.on("leaved", (name) => {
      io.emit("leaved", name); // Change to io.emit() to broadcast to all sockets
    });

    socket.on("typing", (data) => {
      io.emit("typing", data); // Change to io.emit() to broadcast to all sockets
    });

    socket.on("stoptyping", () => {
      io.emit("stoptyping"); // Change to io.emit() to broadcast to all sockets
    });
  });
};
