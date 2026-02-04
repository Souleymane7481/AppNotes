require('dotenv').config(); // Lire .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const notesRoutes = require('./routes/notes.routes');

const app = express();

// Connexion MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
