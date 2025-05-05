import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function OtpScreen() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const res = await fetch('http://localhost:3000/validate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+212600000000', otp }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('✅ Succès', 'OTP valide');
        router.replace('/(tabs)/explore'); 
      } else {
        Alert.alert('❌ Erreur', data.message || 'OTP invalide');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4 bg-white">
      <Text className="text-xl font-bold mb-4">Vérification OTP</Text>
      <TextInput
        className="border w-full px-4 py-2 mb-4 rounded"
        keyboardType="numeric"
        maxLength={6}
        placeholder="Entrez le code OTP"
        onChangeText={setOtp}
        value={otp}
      />
      <Button title="Vérifier le code" onPress={handleVerify} />
    </View>
  );
}
