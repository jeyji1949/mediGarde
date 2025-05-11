// backend/routes/auth.routes.ts
import express, { Request, Response } from 'express';
import admin from '../config/firebase';

const router = express.Router();

// Vérification du token Firebase
router.post('/verify-token', async (req: Request, res: Response) => {
  const { idToken } = req.body;
  
  if (!idToken) {
    return res.status(400).json({ success: false, message: 'Token non fourni.' });
  }
  
  try {
    // Vérifier le token ID avec Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    // Récupérer les informations de l'utilisateur
    const userRecord = await admin.auth().getUser(uid);
    
   
    
    return res.json({ 
      success: true, 
      message: 'Authentification réussie.', 
      user: {
        uid: userRecord.uid,
        phoneNumber: userRecord.phoneNumber
        // Ajouter d'autres champs si nécessaire
      }
    });
  } catch (error) {
    console.error('Erreur de vérification du token :', error);
    return res.status(401).json({ success: false, message: 'Token invalide.' });
  }
});

// Vérifier l'existence d'un utilisateur par téléphone
router.post('/check-user', async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Numéro de téléphone requis.' });
  }
  
  try {
    // Formatage international du numéro si nécessaire
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    try {
      // Vérifier si l'utilisateur existe déjà
      const userRecord = await admin.auth().getUserByPhoneNumber(formattedPhoneNumber);
      return res.json({ 
        success: true, 
        exists: true,
        message: 'Utilisateur existant.' 
      });
    } catch (error) {
      // L'utilisateur n'existe pas
      return res.json({ 
        success: true, 
        exists: false,
        message: 'Utilisateur inexistant.' 
      });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

export default router;