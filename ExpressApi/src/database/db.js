const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'moviesdb';

let client;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(dbName);
};

const getCollection = async (collectionName) => {
    const db = await connectToDatabase();
    return db.collection(collectionName);
};

module.exports = { getCollection, ObjectId };
