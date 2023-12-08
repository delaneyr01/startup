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

// Function to update the calendar with events
function updateCalendarWithEvents(events) {
    // Loop through each event and update the calendar
    events.forEach(event => {
        const { eventName, eventDescription, eventDate, eventTime } = event;

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

async function addEvent() {
    var eventName = document.getElementById('eventName').value;
    var eventDescription = document.getElementById('eventDescription').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventTime = document.getElementById('eventTime').value;

    // Retrieve the current username from local storage
    const currentUsername = localStorage.getItem('currentUsername');

    // Make an HTTP request to your server to add the event
    try {
        await addEventToDatabase(eventName, eventDescription, eventDate, currentUsername);
        alert('Event added successfully');
        console.log('Event added successfully');
    } catch (error) {
        console.error('Error adding event:', error);
        return;
    }

    // Find all elements with data-date and data-time attributes matching the selected date and time
    var dateElements = document.querySelectorAll('td[data-date="' + eventDate + '"]');
    var timeElements = document.querySelectorAll('td[data-time="' + eventTime + '"]');

    // Create an event block for the event name
    var eventBlock = document.createElement('div');
    eventBlock.textContent = eventName;
    eventBlock.className = 'event-block';

    // Create a description div for the event description
    var eventDescriptionDiv = document.createElement('div');
    eventDescriptionDiv.textContent = eventDescription;
    eventDescriptionDiv.className = 'event-description';

    // Loop through each date element
    dateElements.forEach(function(dateElement) {
        // Loop through each time element and check if it's within the date element
        timeElements.forEach(function(timeElement) {
            if (dateElement.contains(timeElement)) {
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
            }
        });
    });
}



// Function to make a POST request to add the event
async function addEventToDatabase(eventName, eventDescription, eventDate, eventTime, currentUsername) {
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
            "eventTime": eventTime,
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
    }

    //return response.json();
}

function storeEventLocally(eventName, eventDescription, eventDate, eventTime) {
    const storedEvents = JSON.parse(sessionStorage.getItem('userEvents')) || [];
    
    storedEvents.push({
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate,
        eventTime: eventTime
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



function formatDate(date){
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return month + '-' + day;
}
function formatDataTag(currDate){
    // Get year, month, and day
    var year = currDate.getFullYear();
    var month = (currDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    var day = currDate.getDate().toString().padStart(2, '0');
    

    // Create the formatted date string
    return year + '-' + month + '-' + day;
}

function assignDates() {
    // Days of the week
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Current date
    var currentDate = new Date();

    // Loop through the days and set the text in the corresponding th element
    var dataOfWeek = [];
    for (var i = 0; i < daysOfWeek.length; i++) {
        var thElement = document.getElementById('weekday-' + i);
        if (thElement) {
            // Calculate the date for the current day
            var currentDayDate = new Date(currentDate);
            currentDayDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
            // Set the text content of the <div> with the day and formatted date
            thElement.firstChild.textContent = daysOfWeek[i] + ' ' + formatDate(currentDayDate);
            dataOfWeek.push(formatDataTag(currentDayDate));
        }
    }

    var timesOfDay = ["09-AM", "10-AM", "11-AM", "12-PM", "01-PM", "02-PM", "03-PM", "04-PM", "05-PM", "06-PM", "07-PM", "08-PM", "09-PM", "10-PM"];

    // Loop through each time
    for (var i = 0; i < timesOfDay.length; i++) {
        // Dynamically construct the attribute selector for each time
        var attributeSelector = 'td[data-time="' + timesOfDay[i] + '"]';

        // Select all <td> elements with the current time
        var tdElements = document.querySelectorAll(attributeSelector);

        // Loop through each selected <td> element
        tdElements.forEach(function (td, index) {
            // Use the correct index for dataOfWeek
            td.setAttribute('data-date', dataOfWeek[index]);
            td.setAttribute('date-time', timesOfDay[i]);

            // Access the <div> inside each <td>
            //var eventDiv = td.querySelector('.event-placeholder');

            // Set the text content of the <div> to the data-date
            //eventDiv.textContent = dataOfWeek[index] + " at " + timesOfDay[i];
        });
    }
}

async function initializePage() {
    assignDates();
    await loadEventsFromLocalStorage(); // Wait for loadEventsFromLocalStorage to complete
    await loadEvents(); // Wait for loadEvents to complete before proceeding
}

