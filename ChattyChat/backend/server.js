const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const sockets = require("./sockets.js");

// constants
const path = __dirname + "/../frontend/dist";

// app and server
const app = express();
const server = http.createServer(app);

// serve vue app
app.use(express.static(path));

// add socket.io server
const socketIoOptions = {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
};

const io = new Server(server, socketIoOptions);

// load sockets from sockets.js file
sockets(io);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
