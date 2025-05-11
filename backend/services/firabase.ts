// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuration Firebase (tirée de ta console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAwlXBsv6sVe1uDnZKrABYy9zTthCfGAus",
  authDomain: "medigarde-4b99c.firebaseapp.com",
  projectId: "medigarde-4b99c",
  storageBucket: "medigarde-4b99c.appspot.com", // corrigé: `.app` -> `.com`
  messagingSenderId: "660417652104",
  appId: "1:660417652104:web:ab3dc3ad682a1cd8e7863d",
  measurementId: "G-VS7MX35X93"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
