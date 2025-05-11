// screens/OTPVerificationScreen.tsx
import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth';

type RootStackParamList = {
  Home: undefined;
  OTPVerificationScreen: { verificationId: string, phoneNumber: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function OTPVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    if (route.params?.verificationId) {
      setVerificationId(route.params.verificationId);
    }
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
    }
  }, [route.params]);

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerifyCode = async () => {
    try {
      setLoading(true);

      if (!verificationCode || verificationCode.length < 6) {
        Alert.alert('Erreur', 'Veuillez entrer le code à 6 chiffres complet');
        setLoading(false);
        return;
      }

      // Créer les informations d'identification Firebase
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      // Connecter l'utilisateur avec ces informations
      await signInWithCredential(auth, credential);
      
      // Authentification réussie, naviguer vers l'écran d'accueil
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erreur de vérification:', error);
      
      // Gérer les erreurs spécifiques
      if (error.code === 'auth/invalid-verification-code') {
        Alert.alert('Erreur', 'Code de vérification invalide. Veuillez réessayer.');
      } else if (error.code === 'auth/code-expired') {
        Alert.alert('Erreur', 'Le code a expiré. Veuillez demander un nouveau code.');
      } else {
        Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (text: string) => {
    // Accepter uniquement les chiffres
    const numericText = text.replace(/[^0-9]/g, '');
    setVerificationCode(numericText);
  };

  const handleResendCode = () => {
    // Retourner à l'écran précédent pour renvoyer un code
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Votre pharmacie de garde, toujours à portée de main !</Text>
      <Text style={styles.description}>
        Veuillez entrer le code à 6 chiffres envoyé au{'\n'}
        <Text style={styles.phoneText}>{phoneNumber}</Text>
      </Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={verificationCode}
        onChangeText={handleCodeChange}
        placeholder="------"
        placeholderTextColor="#AAAAAA"
        editable={!loading}
        autoFocus
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleVerifyCode}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Vérification...' : 'Vérifier'}
        </Text>
      </TouchableOpacity>

      {canResend ? (
        <TouchableOpacity onPress={handleResendCode} disabled={loading}>
          <Text style={styles.resendText}>Renvoyer le code</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.timerText}>
          Renvoyer le code dans {timer}s
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  phoneText: {
    fontWeight: 'bold',
    color: '#444',
  },
  otpInput: {
    backgroundColor: '#eafae9',
    borderRadius: 8,
    height: 50,
    width: '80%',
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#66aa88',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0c0a0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    marginTop: 20,
    color: '#66aa88',
    textDecorationLine: 'underline',
  },
  timerText: {
    marginTop: 20,
    color: '#888',
  }
});