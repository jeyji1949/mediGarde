import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; 
import OnboardingScreen from '../screens/OnboardingScreen'; 
import HomeScreen from '../screens/HomeScreen'; 
import PhoneVerificationScreen from '@/screens/PhoneVerificationScreen';

// Création d'une instance de Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Écran de démarrage (Splash Screen) */}
      {/* Cet écran est affiché en premier et n'a pas d'en-tête */}
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}  
        options={{ headerShown: false }} 
      />

      {/* Écran d'onboarding */}
      {/* Cet écran guide l'utilisateur à travers une introduction à l'application */}
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{ headerShown: false }} 
      />

      {/* Écran de vérification par téléphone (OTP) */}
      {/* Cet écran permet à l'utilisateur de vérifier son numéro de téléphone */}
      <Stack.Screen 
        name="OTP" 
        component={PhoneVerificationScreen} 
        options={{ title: 'Vérification' }} 
      />

      {/* Écran principal (Home) */}
      {/* Cet écran est affiché après l'onboarding ou la vérification */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
