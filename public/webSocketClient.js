
console.log('Before WebSocket connection code');

const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000'); // Use the appropriate port for your WebSocket proxy

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
