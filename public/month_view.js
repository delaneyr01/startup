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
     for (var i = firstDayOfWeek; dateCount <= numberOfDays; i++) {
        var spanElement = tdElements[i].querySelector('span');
        spanElement.innerText = dateCount;


        // Get year, month, and day
        var year = currDate.getFullYear();
        var month = (currDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        var day = currDate.getDate().toString().padStart(2, '0');
        

        // Create the formatted date string
        var formattedDate = year + '-' + month + '-' + day;

        //var formattedDate = getFormattedDate(currDate);
        tdElements[i].setAttribute('data-date', formattedDate);
        
        currDate.setDate(dateCount + 1);
        dateCount += 1;
    }
}

function initializePage(){
    updateCalendar();
    assignDates();
    loadEvents();
}