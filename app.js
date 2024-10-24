const express = require("express");
require('dotenv').config();
const connectdb = require('./bdd');
const helmet = require('helmet'); 
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const port = process.env.PORT || 5000;

const app = express();

// sécuriser les en-têtes HTTP
app.use(helmet()); 

app.use(express.json());

// Middleware simple pour API Key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.query.key; // on recup la clé depuis les params "key"
    if (apiKey && apiKey === process.env.API_KEY) {
        next(); // on next si la clé existe et qu'elle est valide
    } else {
        return res.status(403).json({ error: 'Accès interdit :)' });
    }
};


(async () => {
    try {
        // Connexion en une fois BDD
        const db = await connectdb();

        // mettre bdd dans `req`
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Routes
        app.use('/classrooms', apiKeyMiddleware, classroomRoutes);
        app.use('/classrooms', apiKeyMiddleware, studentRoutes);
        
        app.listen(port, () => {
            console.log("API Au tableau en cours sur le port :", port);
        });
    } catch (err) {
        console.error("Erreur lors du démarrage de l'application :", err);
        process.exit(1);
    }
})();
