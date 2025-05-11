// backend/server.ts
import dotenv from 'dotenv';
dotenv.config(); // ⚠️ toujours en haut

import express from 'express';
import authRoutes from './routes/auth.routes'; // chemin relatif

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ ICI tu passes bien un "router", pas une fonction

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
