function extractUsername() {
    const nameInput = document.getElementById('name');
    const username = nameInput.value.trim();

    if (username !== '') {
        // Make an HTTP request to your server to add the username
        addUsername(username)
            .then(response => {
                alert('Username added successfully');
                console.log('Username added successfully:', response);
            })
            .catch(error => {
                //console.log('bread'); //TEST
                alert('Error adding username');
                console.error('Error adding username:', error);
            });

        // clear the input field after submission
        nameInput.value = '';
    }
}

// Function to make a POST request to add the username
async function addUsername(username) {
    console.log('in addUsername');
    const response = await fetch('/addUsername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username":username }),
    });

    console.log(response.status); // Log the HTTP status code
    console.log(response.statusText); // Log the status text

    if (!response.ok) {
        throw new Error(`Failed to add username. Status: ${response.status}`);
    }

    return response.json();
}