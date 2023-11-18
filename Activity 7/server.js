const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

 

// Our Express app
const app = express();

 

// Create a server and pass it to socket.io
const server = http.createServer(app);
const io = socketIO(server);

 

// Serve static files from the public directory
app.use(express.static('public'));

 

// Handle a client connection
io.on('connection', (socket) => {
  console.log('a user connected');

 

  // Emit a message to the client
  socket.emit('message', 'Hello from the Comet server!');

 

  // Listen for messages from the client
  socket.on('clientEvent', (data) => {
    console.log('message from client:', data);
  });

 

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

 

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});