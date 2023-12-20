import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const HomePage = () => {
    const [username, setUsername] = useState('');

    const clearStoredEvents = () => {
      sessionStorage.removeItem('userEvents');
    };
  
    const handleLogoutOrSwitchUser = () => {
      clearStoredEvents();
      sessionStorage.removeItem('currentUsername');
    };
  
    const extractUsername = () => {
      if (username.trim() !== '') {
        addUsername(username)
          .then(response => {
            storeUsernameLocally(username);
            alert('Username added successfully');
            console.log('Username added successfully:', response);
            const currentUser = getCurrentUser();
            console.log('Current user:', currentUser);
          })
          .catch(error => {
            alert('Error adding username');
            console.error('Error adding username:', error);
          });
  
        // clear the input field after submission
        setUsername('');
      }
    };
  
    const storeUsernameLocally = (username) => {
      sessionStorage.setItem('currentUsername', username);
    };
  
    const getCurrentUser = () => {
      const storedUsername = sessionStorage.getItem('currentUsername');
      return storedUsername || 'No user logged in';
    };
  
    const addUsername = async (username) => {
        console.log('in addUsername');
      const storedUsername = sessionStorage.getItem('currentUsername');
      if (storedUsername) {
        clearStoredEvents();
      }
  
      const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
      const host = window.location.host;
      const response = await fetch('http://localhost:4000/addUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username }),
      });
      
            

      console.log(response.status);
      console.log(response.statusText);
  
      if (!response.ok) {
        throw new Error(`Failed to add username. Status: ${response.status}`);
      }
  
      storeUsernameLocally(username);
  
      return response.json();
    };
    return (
        <div>

        <main>
            <h1 id="welcome-message">Welcome</h1>
            <p>Login to access your personal Skej</p>
            <div id="loginForm">
            <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Your name here"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            <button type="button" onClick={extractUsername}>Login</button>
            </div>
        </main>

        <footer>
            <hr />
            <span className="text-reset">Delaney Reed</span>
            <br />
            <a href="https://github.com/delaneyr01/startup.git">GitHub</a>
        </footer>
        </div>
    );
};

export default HomePage;