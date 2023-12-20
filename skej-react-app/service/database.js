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
    try {
      const result = await usernameCollection.insertOne({ username });
      
      if (result.ops && result.ops.length > 0) {
        console.log('Username added:', result.ops[0]);
        return result.ops[0];
      } else {
        console.error('No documents were inserted');
        return null; // or handle this case based on your application's logic
      }
    } catch (error) {
      console.error('Error adding username:', error);
      throw error;
    }
  }
  
  

async function addEvent(event) {
    const result = await eventCollection.insertOne({
        username: event.username,
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventDate: event.eventDate,
        eventTime: event.eventTime
    });

    console.log("result of addEvent in database.js: ", result);

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
