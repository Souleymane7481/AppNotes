const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notes.controller');

// CRUD
router.post('/', noteController.createNote);           // Ajouter une note
router.get('/', noteController.getNotes);             // Lister toutes les notes ou filtrer par studentId
router.get('/:id', noteController.getNoteById);       // Récupérer une note spécifique
router.put('/:id', noteController.updateNote);        // Modifier une note
router.delete('/:id', noteController.deleteNote);     // Supprimer une note

// Moyennes pondérées
router.get('/average/general', noteController.getAverage);          // Moyenne générale
router.get('/average/semester', noteController.getAverageBySemester); // Moyenne par semestre

module.exports = router;
