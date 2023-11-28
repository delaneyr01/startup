const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Sample array to store events (in-memory storage, replace with a database in production)
let events = [];

apiRouter.get('/events', (req, res) => {
    res.json(events);
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

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

