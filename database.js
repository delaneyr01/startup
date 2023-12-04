const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = 'mongodb+srv://dr455:cs260password@checkmyskejcluster.q8gyzl2.mongodb.net/?';
const client = new MongoClient(url);
const db = client.db('skejaccounts');
const usernameCollection = db.collection('usernames');
const eventCollection = db.collection('events');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addUsername(username) {
    const result = await usernameCollection.insertOne(username);
    return result;
}

async function addEvent(username, eventName, eventDescription, eventDate) {
    const result = await eventCollection.insertOne({
        username: username,
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate
    });

    return result;
}

async function getEventsForUser(username) {
    const events = await eventCollection.find({ username: username }).toArray();
    return events;
}

async function getAllUsernames() {
    const usernames = await usernameCollection.find().toArray();
    return usernames.map(user => user.username); // Assuming the username field exists in your documents
}

module.exports = {addUsername, getAllUsernames, addEvent, getEventsForUser};
