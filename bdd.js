const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

let db;

const connectDB = async () => {
    if (db) {
        return db;
    }
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("mongo success");
        db = client.db(process.env.MONGODB_DATABASE); 
        return db;
    } catch (err) {
        console.error("erreur bdd =>", err);
        process.exit(1); 
    }
};

module.exports = connectDB;
