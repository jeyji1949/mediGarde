import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

// Define the RootStackParamList type
type RootStackParamList = {
  Onboarding: undefined;
  OTP: undefined;
  Home: undefined;
  OTPVerificationScreen: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = ({ navigation }: { navigation: OnboardingScreenNavigationProp }) => {
  const handleNext = () => {
    navigation.replace('OTP'); // Navigate to the OTP screen after onboarding
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Trouver une pharmacie près de chez vous</Text>
      <Text style={styles.description}>Il est facile de trouver une pharmacie près de chez vous d'une simple pression.</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext}>
        <Text style={styles.skip}>Sauter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  skip: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 14,
  },
});

export default OnboardingScreen;
