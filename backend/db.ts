import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ Erreur connexion MongoDB:', err);
  }
};