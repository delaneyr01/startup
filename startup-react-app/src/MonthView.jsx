// MonthView.js
import React, { useState, useEffect } from 'react';
import './MonthView.css';

const MonthView = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    useEffect(() => {
        initializePage();
      }, []);

    const loadEvents = async () => {
        const currentUsername = sessionStorage.getItem('currentUsername');

        try {
            const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
            const host = window.location.host; 
            const response = await fetch(`${protocol}://${window.location.host}/getEventsForUser?username=${currentUsername}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch events. Status: ${response.status}`);
            }

            // Remove the following line, as it consumes the response body
            // const responseText = await response.text(); // Log the actual response text
            // console.log('Response text:', responseText);

            const events = await response.json();
            updateCalendarWithEvents(events);
            setCurrentEvents(events) //REACT test
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const updateCalendarWithEvents = (events) => {
        // Loop through each event and update the calendar
        events.forEach(event => {
            const { eventName, eventDescription, eventDate } = event;

            // Find the td element with data-date attribute matching the event date
            const dateElement = document.querySelector(`td[data-date="${eventDate}"]`);

            if (dateElement) {
                // Check if there's already an event block for this date
                const existingEventBlock = dateElement.querySelector(`.event-block[data-event="${eventName}"]`);

                if (!existingEventBlock) {
                    // Create an event block for the event name
                    const eventBlock = document.createElement('div');
                    eventBlock.textContent = eventName;
                    eventBlock.className = 'event-block';
                    eventBlock.setAttribute('data-event', eventName); // Set a data attribute to identify the event

                    // Create a description div for the event description
                    const eventDescriptionDiv = document.createElement('div');
                    eventDescriptionDiv.textContent = eventDescription;
                    eventDescriptionDiv.className = 'event-description';

                    // Append the event block to the event placeholder
                    const eventPlaceholder = dateElement.querySelector('.event-placeholder');
                    if (eventPlaceholder) {
                        eventPlaceholder.appendChild(eventBlock);

                        // Add hover events to show/hide the description
                        eventBlock.addEventListener('mouseenter', function () {
                            eventBlock.style.display = 'none';
                            eventDescriptionDiv.classList.add('active');
                        });

                        eventDescriptionDiv.addEventListener('mouseleave', function () {
                            eventBlock.style.display = 'block';
                            eventDescriptionDiv.classList.remove('active');
                        });

                        // Append the event description div to the event placeholder
                        eventPlaceholder.appendChild(eventDescriptionDiv);
                    }
                }
            }
        });
    };

    const addEvent = () => {
        // TODO: Fetch post method to your server into an array
        var eventName = document.getElementById('eventName').value;
        var eventDescription = document.getElementById('eventDescription').value;
        var eventDate = document.getElementById('eventDate').value;
        var eventTime = document.getElementById('eventTime').value;

        // Find all elements with data-date attribute matching the selected date
        var dateElements = document.querySelectorAll('td[data-date="' + eventDate + '"]');

        // Create an event block for the event name
        var eventBlock = document.createElement('div');
        eventBlock.textContent = eventName;
        eventBlock.className = 'event-block';

        // Create a description div for the event description
        var eventDescriptionDiv = document.createElement('div');
        eventDescriptionDiv.textContent = eventDescription;
        eventDescriptionDiv.className = 'event-description';

        // Loop through each date element and append the event block
        dateElements.forEach(async function(dateElement) {
            var eventPlaceholder = dateElement.querySelector('.event-placeholder');
            if (eventPlaceholder) {
                // Append the event block to the event placeholder
                eventPlaceholder.appendChild(eventBlock);

                // Add hover events to show/hide the description
                eventBlock.addEventListener('mouseenter', function() {
                    eventBlock.style.display = 'none';
                    eventDescriptionDiv.classList.add('active');
                });

                eventDescriptionDiv.addEventListener('mouseleave', function() {
                    eventBlock.style.display = 'block';
                    eventDescriptionDiv.classList.remove('active');
                });

                // Append the event description div to the event placeholder
                eventPlaceholder.appendChild(eventDescriptionDiv);

                // Make an HTTP request to your server to add the event
                try {
                    await addEventToDatabase(eventName, eventDescription, eventDate);
                    const event = {eventName, eventDescription, eventDate};
                    setCurrentEvents([...currentEvents, event]); //REACT TEST
                    alert('Event added successfully');
                    console.log('Event added successfully');
                } catch (error) {
                    //alert('Error adding event');
                    console.error('Error adding event:', error);
                }
            }
        });
        // Retrieve the current username from local storage
        const currentUsername = sessionStorage.getItem('currentUsername');
        // Notify other clients through WebSocket
        notifyEventAdded(eventName, eventDescription, eventDate, eventTime, currentUsername);
    };

    const notifyEventAdded = (eventName, eventDescription, eventDate, eventTime, currentUsername) => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        // Create a WebSocket connection
        //const socket = new WebSocket('ws://localhost:4000'); // Use the appropriate port for your WebSocket proxy
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = () => {
          console.log('WebSocket connection established');
      
          // Construct a message object
          const message = {
            type: 'event_added',
            data: {
              eventName,
              eventDescription,
              eventDate,
              eventTime,
              currentUsername,
            },
          };
      
          // Send the message as JSON
          socket.send(JSON.stringify(message));
        };
      
        // Handle incoming messages correctly
        socket.onmessage = (event) => {
          console.log("event is ", event.data);
          const data = event.data;
      
          // Check if the message is a JSON string
          try {
            const jsonData = JSON.parse(data);
            console.log('Received JSON:', jsonData);
      
            // Extract the eventName
            const receivedEventName = jsonData.data.eventName;
            const receivedUserName = jsonData.data.currentUsername;
      
            // Use the eventName as needed
            console.log('Received Event Name:', receivedEventName);
            console.log('Received user name:', receivedUserName);
      
            // Append the message to the message container
            appendMessage(receivedEventName, receivedUserName);
      
          } catch (error) {
            console.log('Received non-JSON message:', data);
    
            // Extract eventName value using regular expression
            const eventMatch = data.match(/"eventName"\s*:\s*"([^"]+)"/);
            const eventName = eventMatch ? eventMatch[1] : null;
    
            // Extract currentUsername using regular expression
            const userMatch = data.match(/"currentUsername"\s*:\s*"([^"]+)"/);
            const currentUsername = userMatch ? userMatch[1] : null;
    
            console.log('Extracted Event Name:', eventName);
            console.log('Extracted Username:', currentUsername)
    
            if (eventName != null && currentUsername != null) {
                appendMessage(eventName, currentUsername);
            }
            // Handle non-JSON messages here
          }
        };
      
        // Handle WebSocket connection closure
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
      
        // Handle WebSocket errors
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    };

    const appendMessage = (messageData, currentUsername) => {
        // Retrieve the current username from local storage
        //const currentUsername = sessionStorage.getItem('currentUsername');

        // Get the message container element
        const messageContainer = document.getElementById('messageContainer');

        console.log("got the message container");

        // Create a new div for the message
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${currentUsername} added an event: ${messageData}`;

        // Append the message div to the container
        messageContainer.appendChild(messageDiv);

        console.log("appended the message");

        // Show the message container
        messageContainer.style.display = 'block';

        // Hide the message after a certain period (e.g., 5 seconds)
        setTimeout(() => {
            // Remove the message div from the container
            messageContainer.removeChild(messageDiv);
            
            // If there are no more messages, hide the container
            if (messageContainer.childElementCount === 0) {
                messageContainer.style.display = 'none';
            }
        }, 10000);
    };

    const addEventToDatabase = async (eventName, eventDescription, eventDate) => {
        const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
        const host = window.location.host;
        // Retrieve the current username from local storage
        const currentUsername = sessionStorage.getItem('currentUsername');

        console.log('in addEventToDatabase');
        const response = await fetch('${protocol}://${window.location.host}/addEventToDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "eventName": eventName,
                "eventDescription": eventDescription,
                "eventDate": eventDate,
                "username": currentUsername  // Include the current username
            }),
        });

        console.log(response.status); // Log the HTTP status code
        console.log(response.statusText); // Log the status text

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Server returned an error in JSON format
                try {
                    const errorResponse = await response.json();
                    console.error(`Failed to add event. Status: ${response.status}, Error: ${errorResponse.message}`);
                    throw new Error(`Failed to add event. Status: ${response.status}, Error: ${errorResponse.message}`);
                } catch (jsonError) {
                    console.error('Error response is not in JSON format.');
                    console.error('Error parsing JSON:', jsonError);
                }
            } else {
                // Server returned an error, but not in JSON format
                console.error('Error response is not in JSON format.');
                throw new Error(`Failed to add event. Status: ${response.status}`);
            }
        } else {
            // Log the actual response text
            console.log(await response.text());

            // Store the event locally in the browser
            storeEventLocally(eventName, eventDescription, eventDate);
        }
    };

    const storeEventLocally = (eventName, eventDescription, eventDate) => {
        const storedEvents = JSON.parse(sessionStorage.getItem('userEvents')) || [];
    
        storedEvents.push({
            eventName: eventName,
            eventDescription: eventDescription,
            eventDate: eventDate
        });
    
        sessionStorage.setItem('userEvents', JSON.stringify(storedEvents));
    };

    const loadEventsFromLocalStorage = async () => {
        const protocol = window.location.protocol === 'http:' ? 'http' : 'https';
        const host = window.location.host;
        const storedUsername = sessionStorage.getItem('currentUsername');

        // Fetch events for the current user
        if (storedUsername) {
            const response = await fetch(`${protocol}://${window.location.host}/getEventsForUser?username=${storedUsername}`);
            if (response.ok) {
                const events = await response.json();
                updateCalendarWithEvents(events);
            } else {
                console.error('Error fetching events:', response.status);
            }
        }
    };

    const updateCalendar = () => {
        // Get the current date
        const currentDate = new Date();

        // Get the month and year
        const currentMonth = currentDate.getMonth(); //(0 based)
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();
    
        //const dataTag = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year.toString().padStart(2, '0')}`;
    
        // Get the element to display the current month and year
        const currentMonthYearElement = document.getElementById('currentMonthYear');
    
        // Update the text to display the current month and year
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        currentMonthYearElement.innerText = months[currentMonth] + ' ' + currentYear;
    };

    const assignDates = () => {

        var todaysDate = new Date();

        // Get the current date
        var firstOfMonth = new Date();

        // Set the date to the first day of the month
        firstOfMonth.setDate(1);
        
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        var firstDayOfWeek = firstOfMonth.getDay(); //This is to find what day of the week the first of the month falls on
        
        // Set the date to the last day of the month
        var lastOfMonth = new Date();
        lastOfMonth.setMonth(todaysDate.getMonth() + 1, 0);

        // Get the day of the month (the last day of the current month)
        var numberOfDays = lastOfMonth.getDate();

        // Get all td elements in the table
        var tdElements = document.getElementsByTagName('td');

        // Loop through each td element
        var dateCount = 1;
        var currDate = new Date();
        currDate.setDate(1);
        for (var i = firstDayOfWeek; dateCount <= numberOfDays && i < tdElements.length ; i++) {
            var spanElement = tdElements[i].querySelector('span');
            // Check if spanElement exists before trying to access its properties
            if (spanElement) {
                spanElement.innerText = dateCount;

                // Get year, month, and day
                var year = currDate.getFullYear();
                var month = (currDate.getMonth() + 1).toString().padStart(2, '0');
                var day = currDate.getDate().toString().padStart(2, '0');

                // Create the formatted date string
                var formattedDate = year + '-' + month + '-' + day;

                // Set the data-date attribute
                tdElements[i].setAttribute('data-date', formattedDate);

                // Increment the date count
                dateCount += 1;
                currDate.setDate(dateCount);
            } else {
                console.error('No span element found in tdElements[' + i + ']');
            }
        }
    };

    const initializePage = async () => {
        updateCalendar();
        assignDates();
        await loadEventsFromLocalStorage(); // Wait for loadEventsFromLocalStorage to complete
        await loadEvents(); // Wait for loadEvents to complete before proceeding
    };

    return (
        <div className="month-view">

        <h2 align="center" style={{ color: 'white' }} id="currentMonthYear">
            <div></div>
        </h2>
        <br />

        <div id="messageContainer" className="message-container"></div>

        <div className="col-sm-6">
            <div className="col-sm-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>Add an Event</h3>
                    </div>
                <div className="panel-body">
                    <div className="form-group">
                        <input className="form-control" placeholder="Event Name" id="eventName" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Event Description" id="eventDescription" />
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" placeholder="Date" id="eventDate" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventTime">Select Time:</label>
                        <select id="eventTime" className="form-control">
                            <option value="9-AM">9:00 AM</option>
                            <option value="10-AM">10:00 AM</option>
                            <option value="11-AM">11:00 AM</option>
                            <option value="12-PM">12:00 PM</option>
                            <option value="01-PM">1:00 PM</option>
                            <option value="02-PM">2:00 PM</option>
                            <option value="03-PM">3:00 PM</option>
                            <option value="04-PM">4:00 PM</option>
                            <option value="05-PM">5:00 PM</option>
                            <option value="06-PM">6:00 PM</option>
                            <option value="07-PM">7:00 PM</option>
                            <option value="08-PM">8:00 PM</option>
                            <option value="09-PM">9:00 PM</option>
                            <option value="10-PM">10:00 PM</option>
                        </select>
                    </div>
                        <button type="button" onClick={() => addEvent()}>
                        Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <table className="calendar-table" align="center" cellSpacing="21" cellPadding="21">
            <caption align="top"></caption>
            <thead>
            <tr>
                <th>Sun</th>
                <th style={{ color: 'white' }}>Mon</th>
                <th style={{ color: 'white' }}>Tue</th>
                <th style={{ color: 'white' }}>Wed</th>
                <th style={{ color: 'white' }}>Thu</th>
                <th style={{ color: 'white' }}>Fri</th>
                <th style={{ color: 'white' }}>Sat</th>
            </tr>
            </thead>
            <tbody>
            <tr>

                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>


                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                </tr>
                <tr>
                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                </tr>
                <tr>
                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                </tr>
                <tr>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                </tr>
                <tr>
                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>

                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                    
                    
                    <td>
                        <span></span>
                        <div class="event-placeholder"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
  );
}

export default MonthView;
