import { Pharmacy } from '@/backend/services/data.services';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';





interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onPress?: (pharmacy: Pharmacy) => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={(event: GestureResponderEvent) => onPress && onPress(pharmacy)}>
      {pharmacy.imageUrl ? (
        <Image source={{ uri: pharmacy.imageUrl }} style={styles.profilePic} />
      ) : (
        <View style={styles.profilePic} />
      )}
      <Text style={styles.name}>{pharmacy.name}</Text>
      <Text style={styles.desc}>
        {pharmacy.isOpen ? 'Garde ouverte 🟢' : 'Fermée 🔴'}
        {'\n'}
        {pharmacy.specialties.join(', ')}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.rating}>⭐ {pharmacy.rating.toFixed(1)} ({pharmacy.reviewCount})</Text>
        <Text style={styles.distance}>{pharmacy.distance !== undefined ? (pharmacy.distance / 1000).toFixed(1) : 'N/A'} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 180,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: '#fbc02d',
  },
  distance: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default PharmacyCard;
