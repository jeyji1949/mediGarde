import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  OTPVerificationScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerificationScreen'>;

export default function PhoneVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [countryCode, setCountryCode] = useState<CountryCode>('MA');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSend = () => {
    // TODO: Envoi de l'OTP avec Firebase
    navigation.navigate('OTPVerificationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>➕</Text>
      <Text style={styles.title}>mediGarde</Text>
      <Text style={styles.subtitle}>Votre pharmacie de garde, toujours à portée de main !</Text>
      <Text style={styles.description}>
        Nous enverrons un message SMS unique. Les tarifs des opérateurs peuvent s’appliquer.
      </Text>npm uninstall react-async-hook


      <View style={styles.phoneInputContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          onSelect={(country) => setCountryCode(country.cca2 as CountryCode)}
        />
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Envoyer</Text>
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
      fontSize: 50,
      color: '#66aa88',
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
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
  
