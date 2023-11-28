const { MongoClient } = require('mongodb');
const data = require('./listingdata');
//console.log(data);
const dbName = 'skejaccounts';
const colName = 'usernames';
const url = 'mongodb+srv://dr455:cs260password@checkmyskejcluster.q8gyzl2.mongodb.net/skejaccounts';

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const result = await client.db(dbName).collection(colName).insertMany(data, { ordered: false });

        console.log(`Inserted ${result.insertedCount} docs`);
    } finally {
        await client.close();
    }

}

main().catch(console.error);