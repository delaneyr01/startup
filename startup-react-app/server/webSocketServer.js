// webSocketServer.js

const WebSocket = require('ws');

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (socket) => {
    console.log('Client connected');

    // Send a welcome message to the client as a string
    socket.send('Welcome to the WebSocket server!');

    // Handle messages from the client
    socket.on('message', (message) => {
      // Convert the Buffer data to a string
      const textMessage = message.toString('utf-8');
      console.log('Received:', textMessage);

      // Broadcast the message to all clients (except the sender)
      wss.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(textMessage);
        }
      });
    });

    // Handle the WebSocket connection closing
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
}

module.exports = { createWebSocketServer };