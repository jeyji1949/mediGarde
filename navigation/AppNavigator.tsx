import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; 
import OnboardingScreen from '../screens/OnboardingScreen'; 
import HomeScreen from '../screens/HomeScreen'; 
import PhoneVerificationScreen from '@/screens/PhoneVerificationScreen';
import OTPVerificationScreen from '@/screens/OTPVerificationScreen';  // Importer l'écran OTP

// Création d'une instance de Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Écran de démarrage (Splash Screen) */}
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}  
        options={{ headerShown: false }} 
      />

      {/* Écran d'onboarding */}
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{ headerShown: false }} 
      />

      {/* Écran de vérification par téléphone */}
      <Stack.Screen 
        name="OTP" 
        component={PhoneVerificationScreen} 
        options={{ title: 'Vérification' }} 
      />

      {/* Écran de saisie du code OTP */}
      <Stack.Screen 
        name="OTPVerificationScreen" 
        component={OTPVerificationScreen} 
        options={{ title: 'Code de vérification' }} 
      />

      {/* Écran principal (Home) */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;