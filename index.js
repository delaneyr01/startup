const welcomeMessageElement = document.getElementById('welcome-message');
const nameInput = document.getElementById('name');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', function (event) {
  event.preventDefault();

  const enteredName = nameInput.value;

  fetch('/api/updateName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: enteredName }),
  })
    .then(response => response.json())
    .then(data => {
      welcomeMessageElement.textContent = data.message;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
