const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectdb = require('../bdd');

// Récupérer les étudiants d'une classe
router.get("/:classroom_id/students", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.classroom_id;

        const students = await db.collection('students').find({ classroom_id: new ObjectId(classroomId) }).toArray();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Ajouter un étudiant
router.post("/:classroom_id/students", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.classroom_id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const doublon = await db.collection('students').findOne({ classroom_id: new ObjectId(classroomId), name });
        if (doublon) {
            return res.status(409).json({ error: "L'étudiant existe déjà dans cette classe." });
        }

        await db.collection('students').insertOne({ classroom_id: new ObjectId(classroomId), name });
        res.status(201).json({ message: "Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Supprimer un étudiant
router.delete("/:classroom_id/students/:student_id", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.classroom_id;
        const studentId = req.params.student_id;

        const result = await db.collection('students').findOne({ classroom_id: new ObjectId(classroomId), _id: new ObjectId(studentId) });
        if (!result) {
            return res.status(404).json({ error: "L'étudiant n'existe pas." });
        }

        await db.collection('students').deleteOne({ _id: new ObjectId(studentId) });
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// routes/students.js

// Modifier un étudiant
router.put("/:classroom_id/students/:student_id", async (req, res) => {
    try {
        const db = await connectdb();
        const classroomId = req.params.classroom_id;
        const studentId = req.params.student_id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        // Vérifier si la classe et l'étudiant existent
        const student = await db.collection('students').findOne({ _id: new ObjectId(studentId), classroom_id: new ObjectId(classroomId) });
        if (!student) {
            return res.status(404).json({ error: "L'étudiant ou la classe n'existe pas." });
        }

        // Vérifier s'il existe un étudiant avec le même nom dans la classe
        const duplicateStudent = await db.collection('students').findOne({ name, classroom_id: new ObjectId(classroomId) });
        if (duplicateStudent && duplicateStudent._id.toString() !== studentId) {
            return res.status(409).json({ error: "Le nom de l'étudiant existe déjà dans cette classe." });
        }

        // Mise à jour de l'étudiant
        await db.collection('students').updateOne({ _id: new ObjectId(studentId) }, { $set: { name } });
        res.status(200).json({ message: "Étudiant mis à jour." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


module.exports = router;
