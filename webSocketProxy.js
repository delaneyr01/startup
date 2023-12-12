const http = require('http');
const { createWebSocketServer } = require('./webSocketServer');

function createWebSocketProxy(httpServer) {
  // Create an HTTP server
//   const httpServer = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('WebSocket Proxy');
//   });

  // Create a WebSocket server and pass the HTTP server instance
  const webSocketServer = createWebSocketServer(httpServer);

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      webSocketServer.emit('connection', ws, request);
    });
  });

  // Listen on the provided port for the HTTP server
//   httpServer.listen(port, () => {
//     console.log(`HTTP server listening on port ${port}`);
//   });

  // Return both servers for external use
  return { webSocketServer };
}

module.exports = { createWebSocketProxy };
