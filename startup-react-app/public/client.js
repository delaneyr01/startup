function clearStoredEvents() {
    sessionStorage.removeItem('userEvents');
}
// Function to handle user logout or switch user
function handleLogoutOrSwitchUser() {
    // Clear stored events in local storage
    clearStoredEvents();

    // You might also want to clear other user-related data from local storage
    sessionStorage.removeItem('currentUsername');
}

function extractUsername() {
    const nameInput = document.getElementById('name');
    const username = nameInput.value.trim();

    if (username !== '') {
        // Make an HTTP request to your server to add the username
        addUsername(username)
            .then(response => {
                // Store the username locally
                storeUsernameLocally(username);

                alert('Username added successfully');
                console.log('Username added successfully:', response);

                                // Example usage:
                const currentUser = getCurrentUser();
                console.log('Current user:', currentUser);
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

function storeUsernameLocally(username) {
    sessionStorage.setItem('currentUsername', username);
}

function getCurrentUser() {
    const storedUsername = sessionStorage.getItem('currentUsername');
    return storedUsername || 'No user logged in';
}


async function addUsername(username) {
    console.log('in addUsername');
    const storedUsername = sessionStorage.getItem('currentUsername');

    // Clear stored events only if there was a previous user
    if (storedUsername) {
        clearStoredEvents();
    }

    const response = await fetch('/addUsername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username }),
    });

    console.log(response.status); // Log the HTTP status code
    console.log(response.statusText); // Log the status text

    if (!response.ok) {
        throw new Error(`Failed to add username. Status: ${response.status}`);
    }

    // Store the username locally
    storeUsernameLocally(username);

    return response.json();
}
