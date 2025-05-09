import React, { useState } from 'react';
import {Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function OTPVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    // TODO: Vérification OTP avec Firebase
    console.log('OTP entered:', fullOtp);
    // Après vérification réussie, naviguer vers l'écran Home
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Votre pharmacie de garde, toujours à portée de main !</Text>
      <Text style={styles.description}>
        Soumettez le code à 4 chiffres que vous avez obtenu sur le numéro qui vous a été fourni.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Vérifier</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>Vous n'avez pas reçu d'OTP ? Renvoyer.</Text>
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
  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
  otpInput: {
    backgroundColor: '#eafae9',
    borderRadius: 8,
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#66aa88',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    marginTop: 20,
    color: '#888',
    textDecorationLine: 'underline',
  },
});

