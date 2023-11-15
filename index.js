const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Get the elements for the welcome message, name input, and login button
const welcomeMessageElement = document.getElementById('welcome-message');
const nameInput = document.getElementById('name');
const loginButton = document.getElementById('login-button');


// Add an event listener to the login button
loginButton.addEventListener('click', function (event) {
 event.preventDefault(); // Prevent the form from submitting


 const enteredName = nameInput.value;


 // Check if a name is entered
 if (enteredName.trim() !== '') {
   // Display the personalized welcome message
   welcomeMessageElement.textContent = `Welcome, ${enteredName}!`;
 } else {
   // If no name is entered, show a generic welcome message
   welcomeMessageElement.textContent = 'Welcome!';
 }
});
