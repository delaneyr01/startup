const { MongoClient } = require('mongodb');

const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const url = `mongodb+srv://dr455:dmr32801@checkmyskejcluster.q8gyzl2.mongodb.net/?`;

const client = new MongoClient(url);

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const result = await client.db(dbName).collection(colName).insertMany(data);

        console.log('Inserted $(result.insertedCount} docs');
    } finally {
        await client.close();
    }

}

main().catch(console.error);