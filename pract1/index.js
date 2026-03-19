const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log("Received message:", msg);

    io.emit("Message", msg); 
  });

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});