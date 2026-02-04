const Note = require('../models/Note');

// Ajouter une note
exports.createNote = async (req, res) => {
  try {
    const { studentId, studentName, score, course, semester, coefficient } = req.body;
    const note = new Note({ studentId, studentName, score, course, semester, coefficient });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister toutes les notes ou filtrer par étudiant
exports.getNotes = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une note spécifique
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note non trouvée' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une note
exports.updateNote = async (req, res) => {
  try {
    const { score, course, semester, studentName, coefficient } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note non trouvée' });

    if (score !== undefined) note.score = score;
    if (course) note.course = course;
    if (semester !== undefined) note.semester = semester;
    if (studentName) note.studentName = studentName;
    if (coefficient !== undefined) note.coefficient = coefficient;

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note non trouvée' });
    res.json({ message: 'Note supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Moyenne générale pondérée
exports.getAverage = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (!studentId) return res.status(400).json({ message: 'studentId requis' });

    const result = await Note.aggregate([
      { $match: { studentId } },
      {
        $group: {
          _id: null,
          totalScore: { $sum: { $multiply: ['$score', '$coefficient'] } },
          totalCoeff: { $sum: '$coefficient' }
        }
      },
      {
        $project: {
          avgScore: { $divide: ['$totalScore', '$totalCoeff'] }
        }
      }
    ]);

    const avg = result[0] ? result[0].avgScore : 0;
    res.json({ studentId, average: avg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Moyenne par semestre pondérée
exports.getAverageBySemester = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (!studentId) return res.status(400).json({ message: 'studentId requis' });

    const result = await Note.aggregate([
      { $match: { studentId } },
      {
        $group: {
          _id: '$semester',
          totalScore: { $sum: { $multiply: ['$score', '$coefficient'] } },
          totalCoeff: { $sum: '$coefficient' }
        }
      },
      {
        $project: {
          avgScore: { $divide: ['$totalScore', '$totalCoeff'] }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ studentId, averagesBySemester: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
