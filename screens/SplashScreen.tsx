import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Onboarding: undefined;
};

const SplashScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Onboarding'); // Navigue vers l’onboarding après 2 secondes
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Votre pharmacie de garde, toujours à portée de main ! 🌍💊</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default SplashScreen;
