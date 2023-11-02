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