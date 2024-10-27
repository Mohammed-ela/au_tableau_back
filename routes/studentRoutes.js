const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Récupérer les étudiants d'une classe
router.get("/:classroom_id/students", async (req, res) => {
    try {
        const classroomId = req.params.classroom_id;
        console.log("classroomId reçu :", classroomId);

        const students = await req.db.collection('students').find({ classroom_id: new ObjectId(classroomId) }).toArray();

        if (!students || students.length === 0) {
            return res.status(200).json({ message: "Aucun étudiant trouvé pour cette classe.", students: [] });
        }

        res.status(200).json(students);
    } catch (err) {
        console.error("Erreur lors de la récupération des étudiants :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Ajouter un étudiant
router.post("/:classroom_id/students", async (req, res) => {
    try {
        const classroomId = req.params.classroom_id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const doublon = await req.db.collection('students').findOne({ classroom_id: new ObjectId(classroomId), name: name.trim() });
        if (doublon) {
            return res.status(409).json({ error: "L'étudiant existe déjà dans cette classe." });
        }

        // Insérer le nouvel étudiant
        const result = await req.db.collection('students').insertOne({ classroom_id: new ObjectId(classroomId), name: name.trim() });
        console.log("Étudiant ajouté avec ID :", result.insertedId);
        res.status(201).json({ message: "Étudiant créé", student: { _id: result.insertedId, classroom_id: classroomId, name: name.trim() } });
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'étudiant :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Supprimer un étudiant
router.delete("/:classroom_id/students/:student_id", async (req, res) => {
    try {
        const classroomId = req.params.classroom_id;
        const studentId = req.params.student_id;

        const student = await req.db.collection('students').findOne({ classroom_id: new ObjectId(classroomId), _id: new ObjectId(studentId) });
        if (!student) {
            return res.status(404).json({ error: "L'étudiant n'existe pas." });
        }

        await req.db.collection('students').deleteOne({ _id: new ObjectId(studentId) });
        res.status(204).end();
    } catch (err) {
        console.error("Erreur lors de la suppression de l'étudiant :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Mettre à jour un étudiant
router.put("/:classroom_id/students/:student_id", async (req, res) => {
    try {
        const classroomId = req.params.classroom_id;
        const studentId = req.params.student_id;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: "Le paramètre name est manquant." });
        }

        const student = await req.db.collection('students').findOne({ _id: new ObjectId(studentId), classroom_id: new ObjectId(classroomId) });
        if (!student) {
            return res.status(404).json({ error: "L'étudiant ou la classe n'existe pas." });
        }

        const duplicateStudent = await req.db.collection('students').findOne({ name, classroom_id: new ObjectId(classroomId) });
        if (duplicateStudent && duplicateStudent._id.toString() !== studentId) {
            return res.status(409).json({ error: "Le nom de l'étudiant existe déjà dans cette classe." });
        }

        // Mettre à jour l'étudiant
        await req.db.collection('students').updateOne({ _id: new ObjectId(studentId) }, { $set: { name: name.trim() } });
        res.status(200).json({ message: "Étudiant mis à jour." });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'étudiant :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
