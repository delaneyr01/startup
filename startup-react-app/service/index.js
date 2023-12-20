const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createWebSocketProxy } = require('./webSocketProxy.js'); 
const startWebSocketClient = require('./webSocketClient.js');
const app = express();
const DB = require('./database.js');
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static('public'));


// The service port. In production the application is statically hosted by the service on the same port.
const port = 4000;

app.use(cors());

app.use(bodyParser.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/events', async (req, res) => {
    try {
        const events = await DB.getAllUsernames();
        res.send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch events' });
    }
});

apiRouter.post('/events', async (req, res) => {
    const { name, description, date } = req.body;

    if (name && description && date) {
        try {
            const newEvent = {
                name: name,
                description: description,
                date: date
            };

            // Call the addEvent function from your server code
            const result = await DB.addEvent(newEvent);

            res.status(201).json({ message: 'Event added successfully', event: result.ops[0] });
        } catch (error) {
            console.error('Error adding event:', error);
            res.status(500).json({ message: 'Failed to add event' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request. Please provide name, description, and date.' });
    }
});


app.post('/addUsername', async (req, res) => {
    console.log('Received POST request to /addUsername');
    const username = req.body;
    console.log(username);
    try {
        // Call the addUsername function from your server code
        const result = await DB.addUsername(username);
        res.status(202).send({ success: true, result });

    } catch (error) {
        console.error('Error adding username:', error);
        res.status(500).json({ success: false, error: 'Failed to add username' });
    }
});

app.post('/addEventToDatabase', async (req, res) => {
    console.log('Received POST request to /addEventToDatabase');
    const event= req.body;
    console.log(event);
    try {
        // Call the addUsername function from your server code
        const result = await DB.addEvent(event);
        console.log('Event added:', result);
        res.status(202).send({ success: true, result });

    } catch (error) {
        console.error('Error adding username:', error);
        res.status(500).json({ success: false, error: 'Failed to add username' });
    }
});

app.get('/getEventsForUser', async (req, res) => {
    const username = req.query.username;

    try {
        // Use DB.getEventsForUser instead of calling the function directly
        const events = await DB.getEventsForUser(username);
        res.json(events);
    } catch (error) {
        console.error('Error in /getEventsForUser:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: __dirname});
 });

// Serve 'index.html' for any other path, but make sure it's not a file or directory
// app.get('*', (req, res) => {
//     if (req.url.indexOf('/api') === 0) {
//       // Handle API routes here if needed
//       // You may want to skip sending 'index.html' for API routes
//       // and handle them separately
//       return res.status(404).send('Not Found');
//     }
  
//     res.sendFile(path.join(__dirname, 'src', 'index.js'));
//   });

const httpServer = app.listen(port, () => {
    console.log('cookie'); //TEST
    console.log(`Listening on port ${port}`);

    // Launch WebSocket client when the server starts
    const { socket } = startWebSocketClient();

    // Create the WebSocket proxy and obtain references to HTTP server and WebSocket server
    const { webSocketServer } = createWebSocketProxy(httpServer, socket);

    // Your WebSocket server logic can go here inside the 'connection' event handler
    webSocketServer.on('connection', (ws) => {
        console.log('WebSocket connection established through proxy');

        // Send a welcome message to the connected client
        ws.send('Welcome to the WebSocket server through the proxy!');

        // Handle messages from the client
        ws.on('message', (message) => {
            const textMessage = message.toString('utf-8');
            console.log('Server Received:', textMessage);

            // Echo the received message back to the client
            ws.send(`You sent: ${textMessage}`);
        });

        // Handle the WebSocket connection closing
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
});