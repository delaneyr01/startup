// Check if the user is logged in (you may have your own authentication logic)
const userIsLoggedIn = /* Your authentication logic here, e.g., checking a user token, session, etc. */;

// Get the element where you want to display the "Welcome!" message
const welcomeMessageElement = document.getElementById('welcome-message');

// Function to display the "Welcome!" message
function displayWelcomeMessage() {
  welcomeMessageElement.textContent = 'Welcome!';
}

// Function to hide the "Welcome!" message
function hideWelcomeMessage() {
  welcomeMessageElement.textContent = '';
}

// Check if the user is logged in and display the message accordingly
if (userIsLoggedIn) {
  displayWelcomeMessage();
} else {
  hideWelcomeMessage();
}