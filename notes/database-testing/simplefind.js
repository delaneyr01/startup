const { MongoClient } = require('mongodb');

const dbName = 'skejaccounts';
const colName = 'usernames';


const url = 'mongodb+srv://dr455:cs260password@checkmyskejcluster.q8gyzl2.mongodb.net/skejaccounts';

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const cursor = client.db(dbName).collection(colName).find();
        const result = await cursor.toArray();
        result.forEach((i) => console.log(i));
    } finally {
        await client.close();
    }
}

main().catch(console.error);