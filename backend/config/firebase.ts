// config/firebase.ts (client-side)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Votre configuration Firebase Web
const firebaseConfig = {
  apiKey: "AIzaSyAwlXBsv6sVe1uDnZKrABYy9zTthCfGAus",
  authDomain: "medigarde-4b99c.firebaseapp.com",
  projectId: "medigarde-4b99c",
  storageBucket: "medigarde-4b99c.appspot.com", 
  messagingSenderId: "660417652104",
  appId: "1:660417652104:web:ab3dc3ad682a1cd8e7863d",
  measurementId: "G-VS7MX35X93"
};

// Initialiser Firebase si ce n'est pas déjà fait
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  
  // Initialiser Auth avec persistence
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  app = getApps()[0];
}

// Obtenir l'instance Auth
const auth = getAuth(app);

export { app, auth };