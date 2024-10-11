const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const classroomRoutes = require("./routes/classroomRoutes");
const studentRoutes = require("./routes/studentRoutes");
const app = express();
const port = process.env.PORT || 5000;
//bdd 
require("./config/database"); 
// Sécurisation des en-têtes
app.use(helmet());
// Activer les CORS
app.use(cors());
// Gestion des requêtes JSON
app.use(express.json());

// Routes API
app.use("/classrooms", classroomRoutes);
app.use("/classrooms/:classroom_id/students", studentRoutes);

// Page d'accueil
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur mon API de gestion de soutenances" });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur en ligne sur le port : ${port}`);
});
