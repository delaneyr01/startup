// webSocketServer.js

const WebSocket = require('ws');

function createWebSocketServer() {
  const server = new WebSocket.Server({ noServer: true });

  server.on('connection', (socket) => {
    console.log('Client connected');

    // Send a welcome message to the client as a string
    socket.send('Welcome to the WebSocket server!');

    // Handle messages from the client
    socket.on('message', (message) => {
      // Convert the Buffer data to a string
      const textMessage = message.toString('utf-8');
      console.log('Received:', textMessage);

      // Send a response back to the client as a string
      socket.send(`You sent: ${textMessage}`);
    });

    // Handle the WebSocket connection closing
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return server;
}

module.exports = { createWebSocketServer };
