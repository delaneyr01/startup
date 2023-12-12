
console.log('Before WebSocket connection code');

const WebSocket = require('ws');

const protocol = 'ws';
const host = 'localhost';
const port = 4000; // Replace with the actual port of your WebSocket server

const socket = new WebSocket(`${protocol}://${host}:${port}/ws`);

function startWebSocketClient() {
    console.log('Before WebSocket connection code');
  
    const protocol = 'ws';
    const host = 'localhost';
    const port = 4000; // Replace with the actual port of your WebSocket server
  
    const socket = new WebSocket(`${protocol}://${host}:${port}/ws`);
  
    // WebSocket client logic...
    socket.on('open', () => {
        console.log('WebSocket connection established');
        // Send a test message
        socket.send('Test message from client');
      });
      
      socket.on('message', (data) => {
        // Convert the Buffer data to a string
        const textMessage = data.toString('utf-8');
        console.log('Client Received:', textMessage);
      });
      
      socket.on('close', (code, reason) => {
        console.log(`WebSocket closed: ${code} - ${reason}`);
      });
      
      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
  
    // Ensure that the WebSocket client is exported as an object
    return {
      socket,
      // Add any other properties or methods you may need
    };
  }

  module.exports = startWebSocketClient;

