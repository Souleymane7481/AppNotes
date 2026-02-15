require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const notesRoutes = require('./routes/notes.routes');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Route de test (IMPORTANT pour vérifier que Render fonctionne)
app.get('/test', (req, res) => {
  res.json({ message: 'Backend OK sur Render 🚀' });
});

// Routes principales
app.use('/api/notes', notesRoutes);

// Connexion MongoDB
connectDB();

// PORT (OBLIGATOIRE pour Render)
const PORT = process.env.PORT || 5000;

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
