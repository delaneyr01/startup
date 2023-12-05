/*
// Function to load events from the server
async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();

        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Function to add an event to the server
async function addEventToServer(eventName, eventDescription, eventDate) {
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                description: eventDescription,
                date: eventDate,
            }),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
            // Reload events from the server after adding a new event
            loadEvents();
        } else {
            // Handle error scenario if needed
            console.error('Failed to add event:', response.status, response.statusText);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error adding event:', error);
    }
}


function addEvent() {
    //TODO: fetch post method to my server into an array
    var eventName = document.getElementById('eventName').value;
    var eventDescription = document.getElementById('eventDescription').value;
    var eventDate = document.getElementById('eventDate').value;

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
    dateElements.forEach(function(dateElement) {
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
        }
    });
}
*/

async function loadEvents() {
    const currentUsername = sessionStorage.getItem('currentUsername');

    try {
        const response = await fetch(`/getEventsForUser?username=${currentUsername}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch events. Status: ${response.status}`);
        }

        // Remove the following line, as it consumes the response body
        // const responseText = await response.text(); // Log the actual response text
        // console.log('Response text:', responseText);

        const events = await response.json();
        updateCalendarWithEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

/*
// Function to update the calendar with events
function updateCalendarWithEvents(events) {
    // Loop through each event and update the calendar
    events.forEach(event => {
        const { eventName, eventDescription, eventDate } = event;

        // Find the td element with data-date attribute matching the event date
        const dateElement = document.querySelector(`td[data-date="${eventDate}"]`);

        if (dateElement) {
            // Create an event block for the event name
            const eventBlock = document.createElement('div');
            eventBlock.textContent = eventName;
            eventBlock.className = 'event-block';

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
    });
}
*/

// Function to update the calendar with events
function updateCalendarWithEvents(events) {
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
}

function addEvent() {
    // TODO: Fetch post method to your server into an array
    var eventName = document.getElementById('eventName').value;
    var eventDescription = document.getElementById('eventDescription').value;
    var eventDate = document.getElementById('eventDate').value;

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
                alert('Event added successfully');
                console.log('Event added successfully');
            } catch (error) {
                //alert('Error adding event');
                console.error('Error adding event:', error);
            }
        }
    });
}

// Function to make a POST request to add the event
async function addEventToDatabase(eventName, eventDescription, eventDate) {
    // Retrieve the current username from local storage
    const currentUsername = sessionStorage.getItem('currentUsername');

    console.log('in addEventToDatabase');
    const response = await fetch('/addEventToDatabase', {
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
                throw new Error(`Failed to add event. Status: ${response.status}, Error: ${errorResponse.message}`);
            } catch (jsonError) {
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
}

function storeEventLocally(eventName, eventDescription, eventDate) {
    const storedEvents = JSON.parse(sessionStorage.getItem('userEvents')) || [];
    
    storedEvents.push({
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate
    });

    sessionStorage.setItem('userEvents', JSON.stringify(storedEvents));
}


function getStoredEvents() {
    return JSON.parse(sessionStorage.getItem('userEvents')) || [];
}


async function loadEventsFromLocalStorage() {
    const storedUsername = sessionStorage.getItem('currentUsername');

    // Fetch events for the current user
    if (storedUsername) {
        const response = await fetch(`/getEventsForUser?username=${storedUsername}`);
        if (response.ok) {
            const events = await response.json();
            updateCalendarWithEvents(events);
        } else {
            console.error('Error fetching events:', response.status);
        }
    }
}



function updateCalendar() {
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
}

function assignDates() {

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
}

async function initializePage() {
    updateCalendar();
    assignDates();
    await loadEventsFromLocalStorage(); // Wait for loadEventsFromLocalStorage to complete
    await loadEvents(); // Wait for loadEvents to complete before proceeding
}
