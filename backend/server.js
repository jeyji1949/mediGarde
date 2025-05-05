// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));
  

// Test route
app.get('/', (req, res) => {
  res.send('API MediGarde en ligne 🩺🚀');
});

// Exemple de route pour récupérer les pharmacies
app.get('/pharmacies', (req, res) => {
  const pharmacies = [
    { id: 1, name: "Pharmacie Centrale", latitude: 34.02, longitude: -6.84 },
    { id: 2, name: "Pharmacie des Nations", latitude: 34.03, longitude: -6.85 }
  ];
  res.json(pharmacies);
});

app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});
