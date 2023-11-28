const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = 'mongodb+srv://dr455:cs260password@checkmyskejcluster.q8gyzl2.mongodb.net/?';
const client = new MongoClient(url);
const db = client.db('skejaccounts');
const scoreCollection = db.collection('usernames');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
  const result = await scoreCollection.insertOne(score);
  return result;
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { addScore, getHighScores };
