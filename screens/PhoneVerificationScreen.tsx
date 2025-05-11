import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { PhoneAuthProvider, getAuth } from 'firebase/auth';
import { useRef } from 'react';

type RootStackParamList = {
  OTPVerificationScreen: { verificationId: string; phoneNumber: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerificationScreen'>;

export default function PhoneVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [countryCode, setCountryCode] = useState<CountryCode>('MA');
  const [callingCode, setCallingCode] = useState<string>('212');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const recaptchaVerifier = useRef(null);
  const firebaseApp = getApp();
  const auth = getAuth();

  const handleSendVerificationCode = async () => {
    try {
      setLoading(true);
      
      // Format phone number with country code
      const formattedPhoneNumber = `+${callingCode}${phoneNumber.replace(/^0+/, '')}`;
      console.log('Formatted Phone:', formattedPhoneNumber);
      
      // Check if the phone number is valid
      if (!phoneNumber || phoneNumber.length < 9) {
        Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide');
        setLoading(false);
        return;
      }

      // Send verification code via Firebase
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhoneNumber,
        recaptchaVerifier.current
      );
      
      // Navigate to OTP verification screen with verification ID
      navigation.navigate('OTPVerificationScreen', {
        verificationId,
        phoneNumber: formattedPhoneNumber
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code:', error);
      Alert.alert(
        'Erreur',
        'Impossible d\'envoyer le code de vérification. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
        attemptInvisibleVerification={true}
      />
      
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Votre pharmacie de garde, toujours à portée de main !</Text>
      <Text style={styles.description}>
        Nous enverrons un message SMS unique pour vérifier votre numéro. Les tarifs des opérateurs peuvent s'appliquer.
      </Text>
      
      <View style={styles.phoneInputContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          onSelect={(country) => {
            setCountryCode(country.cca2 as CountryCode);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <Text style={styles.callingCodeText}>+{callingCode}</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Numéro de téléphone"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={!loading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSendVerificationCode}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Envoi en cours...' : 'Envoyer le code'}
        </Text>
      </TouchableOpacity>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#cceacc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#eafae9',
    width: '100%',
    marginBottom: 20,
  },
  callingCodeText: {
    marginHorizontal: 5,
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#66aa88',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
    width: '100%',
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
});