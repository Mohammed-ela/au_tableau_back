const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// GET toutes les classes
router.get("/", async (req, res) => {
    try {
        const classrooms = await req.db.collection('classrooms').find().toArray();
        
        if (classrooms.length === 0) {
            return res.status(200).json({ message: "Aucune classe n'est enregistrée.", classrooms: [] });
        }

        res.status(200).json(classrooms);
    } catch (err) {
        console.error("Erreur lors de la récupération des classes :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST une classe
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const doublon = await req.db.collection('classrooms').findOne({ name });
        if (doublon) {
            return res.status(409).json({ error: "Le paramètre 'name' existe déjà." });
        }

        await req.db.collection('classrooms').insertOne({ name });
        res.status(201).json({ message: "Classe créée avec succès." });
    } catch (err) {
        console.error("Erreur lors de la création de la classe :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// DELETE une classe
router.delete("/:id", async (req, res) => {
    try {
        const classroomId = req.params.id;

        const result = await req.db.collection('classrooms').findOne({ _id: new ObjectId(classroomId) });
        if (!result) {
            return res.status(404).json({ error: "La classe n'existe pas." });
        }

        await req.db.collection('classrooms').deleteOne({ _id: new ObjectId(classroomId) });
        res.status(200).json({ message: "Classe supprimée avec succès." });
    } catch (err) {
        console.error("Erreur lors de la suppression de la classe :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// PUT (modifier) une classe
router.put("/:id", async (req, res) => {
    try {
        const classroomId = req.params.id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const existingClassroom = await req.db.collection('classrooms').findOne({ _id: new ObjectId(classroomId) });
        if (!existingClassroom) {
            return res.status(404).json({ error: "La classe n'existe pas." });
        }

        const duplicateClass = await req.db.collection('classrooms').findOne({ name });
        if (duplicateClass && duplicateClass._id.toString() !== classroomId) {
            return res.status(409).json({ error: "Le paramètre 'name' existe déjà." });
        }

        await req.db.collection('classrooms').updateOne({ _id: new ObjectId(classroomId) }, { $set: { name } });
        res.status(200).json({ message: "Classe mise à jour." });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la classe :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
