const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

let db = null;

const connectDB = async () => {
    if (!db) {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("MongoDB connecté");
            db = client.db(process.env.MONGODB_DATABASE);
        } catch (err) {
            console.error("Erreur lors de la connexion à MongoDB:", err);
            process.exit(1); 
        }
    }
    return db;
};

module.exports = connectDB;
