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
        app.use('/classrooms', classroomRoutes);
        app.use('/classrooms', studentRoutes);  

        app.listen(port, () => {
            console.log("API Au tableau en cours sur le port :", port);
        });
    } catch (err) {
        console.error("Erreur lors du démarrage de l'application :", err);
        process.exit(1);
    }
})();
