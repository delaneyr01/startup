function addEvent() {
    var eventName = document.getElementById('eventName').value;
    var eventDescription = document.getElementById('eventDescription').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventTime = document.getElementById('eventTime').value;

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
function assignDates(){

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

    for (var i = 0; i < 14; i++) {
        // Dynamically construct the attribute selector for each time
        var attributeSelector = 'td[data-time="' + timesOfDay[i] + '"]';
    
        // Select all <td> elements with the current time
        var tdElements = document.querySelectorAll(attributeSelector);
    
        // Loop through each selected <td> element
        tdElements.forEach(function(td, index) {
            tdElements[i].setAttribute('data-date', dataOfWeek[i]);
            // Access the <div> inside each <td>
            var eventDiv = td.querySelector('.event-placeholder');

            //eventDiv.textContent = dataOfWeek[index]; 
      });
    }
}
