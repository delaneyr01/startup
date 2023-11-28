const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Sample array to store events (in-memory storage, replace with a database in production)
let events = [];

apiRouter.get('/events', async (req, res) => {
    const events = await DB.getAllUsernames();
    res.send(events);
});

apiRouter.post('/events', (req, res) => {
    const { name, description, date } = req.body;

    if (name && description && date) {
        const newEvent = {
            name: name,
            description: description,
            date: date
        };

        events.push(newEvent);

        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } else {
        res.status(400).json({ message: 'Invalid request. Please provide name, description, and date.' });
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});