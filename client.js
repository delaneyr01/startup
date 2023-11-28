document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const nameInput = document.getElementById('name');
    const username = nameInput.value.trim();

    if (username !== '') {
        // Make an HTTP request to your server to add the username
        addUsername(username)
            .then(response => {
                console.log('Username added successfully:', response);
            })
            .catch(error => {
                console.error('Error adding username:', error);
            });

        // Optionally, you can clear the input field after submission
        nameInput.value = '';
    }
});

// Function to make a POST request to add the username
async function addUsername(username) {
    const response = await fetch('/addUsername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error(`Failed to add username. Status: ${response.status}`);
    }

    return response.json();
}
