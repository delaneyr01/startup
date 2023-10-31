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