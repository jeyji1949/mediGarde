// frontend/src/services/auth.service.ts
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult,
  UserCredential 
} from 'firebase/auth';
import axios from 'axios';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwlXBsv6sVe1uDnZKrABYy9zTthCfGAus",
  authDomain: "medigarde-4b99c.firebaseapp.com",
  projectId: "medigarde-4b99c",
  storageBucket: "medigarde-4b99c.firebasestorage.app",
  messagingSenderId: "660417652104",
  appId: "1:660417652104:web:ab3dc3ad682a1cd8e7863d",
  measurementId: "G-VS7MX35X93"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Variable pour stocker la confirmation
let confirmationResult: ConfirmationResult | null = null;

/**
 * Envoie un code OTP au numéro de téléphone spécifié
 * @param phoneNumber Numéro de téléphone avec code pays (ex: +33612345678)
 * @returns Promise resolving when OTP is sent
 */
export const sendOTP = async (phoneNumber: string): Promise<void> => {
  try {
    // Formater le numéro de téléphone si nécessaire
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    // Créer le Recaptcha invisible
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA résolu, on continue
      }
    });
    
    // Envoyer le code SMS via Firebase
    confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    
    console.log('OTP envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du code :', error);
    throw error;
  }
};

/**
 * Vérifie le code OTP
 * @param code Code OTP à 6 chiffres
 * @returns La réponse du serveur avec les données utilisateur
 */
export const verifyOTP = async (code: string): Promise<any> => {
  try {
    if (!confirmationResult) {
      throw new Error('Aucun code OTP n\'a été envoyé');
    }
    
    // Vérifier le code OTP avec Firebase
    const userCredential: UserCredential = await confirmationResult.confirm(code);
    
    // Obtenir le token ID
    const idToken = await userCredential.user.getIdToken();
    
    // Vérifier le token avec notre backend
    const response = await axios.post('/api/auth/verify-token', { idToken });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification du code :', error);
    throw error;
  }
};

/**
 * Vérifie si un utilisateur existe avec ce numéro de téléphone
 * @param phoneNumber Numéro de téléphone
 * @returns Réponse du serveur indiquant si l'utilisateur existe
 */
export const checkUserExists = async (phoneNumber: string): Promise<boolean> => {
  try {
    const response = await axios.post('/api/auth/check-user', { phoneNumber });
    return response.data.exists;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
    throw error;
  }
};