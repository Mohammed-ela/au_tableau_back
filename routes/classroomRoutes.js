const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectdb = require('../bdd');

// GET toutes les classes
router.get("/", async (req, res) => {
    try {
        const db = await connectdb();
        const classrooms = await db.collection('classrooms').find().toArray();
        res.status(200).json(classrooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST une classe
router.post("/", async (req, res) => {
    try {
        const db = await connectdb();
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const doublon = await db.collection('classrooms').findOne({ name });
        if (doublon) {
            return res.status(409).json({ error: "Le paramètre 'name' existe déjà." });
        }

        await db.collection('classrooms').insertOne({ name });
        res.status(201).json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// DELETE une classe
router.delete("/:id", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.id;

        const result = await db.collection('classrooms').findOne({ _id: new ObjectId(classroomId) });
        if (!result) {
            return res.status(404).json({ error: "La classe n'existe pas." });
        }

        await db.collection('classrooms').deleteOne({ _id: new ObjectId(classroomId) });
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

//PUT (modifier) une classe
router.put("/:id", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }
        // si la classe existe pas
        const existingClassroom = await db.collection('classrooms').findOne({ _id: new ObjectId(classroomId) });
        if (!existingClassroom) {
            return res.status(404).json({ error: "La classe n'existe pas." });
        }
        // le nom de la classe existe deja
        const duplicateClass = await db.collection('classrooms').findOne({ name });
        if (duplicateClass && duplicateClass._id.toString() !== classroomId) {
            return res.status(409).json({ error: "Le paramètre 'name' existe déjà." });
        }
        // requete d'update en fonction de l'id
        await db.collection('classrooms').updateOne({ _id: new ObjectId(classroomId) }, { $set: { name } });
        res.status(200).json({ message: "Classe mise à jour." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


module.exports = router;
