const http = require('http');
const { createWebSocketServer } = require('./webSocketServer');

function createWebSocketProxy(httpServer) {
  // Create a WebSocket server and pass the HTTP server instance
  const webSocketServer = createWebSocketServer(httpServer);

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      webSocketServer.emit('connection', ws, request);

      // Add event listener for handling ping messages
      ws.on('ping', () => {
        // Respond to ping messages with a pong message
        ws.pong();
      });
    });
  });

  // Return both servers for external use
  return { webSocketServer };
}

module.exports = { createWebSocketProxy };
