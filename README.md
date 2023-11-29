# Your Planner Website

Take control of your schedule with our intuitive planner website. View assignments with our interactive calendar. Switch to the weekly view to see your schedule by the hour! Personalize the planner by selecting a color theme and customizing to-do lists. With your life organized, you can make the most of every day!

## Key Features

- Personalized weekly calendar: Plan your schedule by the day and the hour.
- Assignment due dates: Store all your assignment due dates and manage your schedule effectively.
- To-do lists for each day: Stay organized with to-do lists for every day.
- Personalization: Customize the colors and theme of your calendar to make it yours.

## Technology Stack

- Authentication: Email and password
- Database: Class assignments/schedule
- WebSocket data: Creating a new event/assignment. Be able to tag someone else's account in an event (Example: Lunch with Jack) and send them a notification.

## Design Images

![Calendar View](/Users/delaneyreed/Desktop/startup/design_images/Startup_Calendar_View.JPG)
![Weekly View](/Users/delaneyreed/Desktop/startup/design_images/Startup_Weekly_View.JPG)

## HTML Updates (9-30)
In this update, I have added a month page where you can view your schedule at a month view, a week page where you can view your schedule at a week view with hourly time slots, and a theme page in which you can select the color of the page (this is not yet functioning without CSS). The index page also has a place to log in to access your schedule, a link to the rest of the pages, and a link to my GitHub. I also added a new icon for the tab. There is also a placeholder to add a new event, and in the future, you will be able to tag other accounts in that event. There is also an accounts page that will hold the accounts in the database.

## CSS Updates (10-14)
I have successfully deployed the simon-html and the simon-css files to the simon subdomain

I added a color gradient on each of the pages and interactive-hover over elemtns in the month-view and week-view. I made the header nice and consistent for the pages and a place where you can pick the theme, but it won't be functional until I add JavaScript

## JavaScript Updates (11-1)
I have successfully deployed the simon-js files to the simon subdomain
I made it possible to fill out an event form and add an event to the calendar on both the week view and month view pages. The theme page also allows you to select the theme, however I haven't gotten it to apply to the whole website yet.

## Service Updates (11-15)
Successfully deployed the simon-service files to the simon subdomain
I created a web service that listens on a network port for HTTP requests for the startup domain

## Service Updates (11-28)
I implemented client-side JavaScript functions for adding and displaying events on a calendar. Events are sent to the server using the addEventToServer function, and the loadEvents function retrieves and displays events from the server.

## Database Updates (11-28)
I created my MongoDB Atlas database, provided backend endpoints for manipulating application data, and store the data in the database. Whenever a username is entered into the login field on the main page, the username get's added to the database I created.
