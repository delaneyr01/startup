function addEvent() {
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
    const currentMonth = currentDate.getMonth(); // 0-based (January is 0)
    const currentYear = currentDate.getFullYear();
  
    // Get the element to display the current month and year
    const currentMonthYearElement = document.getElementById('currentMonthYear');
  
    // Update the text to display the current month and year
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    currentMonthYearElement.textContent = months[currentMonth] + ' ' + currentYear;
  
    // Now, you can generate the calendar for the current month and year, adjusting the table as needed.
    // You will need to write code to update the table cells for the days of the month.
    // You can clear any existing events and populate the new events for the current month.
  
    // Example code to generate a new calendar (you'll need to adapt this to your needs):
    const tableBody = document.querySelector('tbody');
    // Clear the table
    tableBody.innerHTML = '';
  
    // Add your code here to populate the table with the days of the current month
    // You may also need to add event handling for date selection or navigation.
  }
  
  // Call the function to initialize the calendar with the current month
  updateCalendar();