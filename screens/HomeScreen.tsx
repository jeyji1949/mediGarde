import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ApiService, { Pharmacy, Doctor } from '@/backend/services/data.services';

const HomeScreen = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await ApiService.getCurrentLocation();
        const fetchedPharmacies = await ApiService.getPharmacies(
          location.coords.latitude,
          location.coords.longitude
        );
        const fetchedDoctors = await ApiService.getDoctors(
          location.coords.latitude,
          location.coords.longitude
        );
        setPharmacies(fetchedPharmacies);
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Erreur de récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logoText}>mediGarde</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Recherche une pharmacie" style={styles.searchInput} />
      </View>

      {/* Suggested pharmacy */}
      <View style={styles.suggestionCard}>
        <View style={styles.pharmacyInfo}>
          <View style={styles.imagePlaceholder} />
          <View>
            <Text style={styles.cardTitle}>Pharmacie</Text>
            <Text style={styles.cardSub}>Obtenir des médicaments vérifiés.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.getButton}>
          <Text style={styles.getButtonText}>Get</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Nearby pharmacies */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pharmacies de garde à proximité</Text>
          <TouchableOpacity><Text style={styles.viewAll}>Voir tous</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pharmacies.map(pharmacy => (
            <View key={pharmacy.id} style={styles.card}>
              <View style={styles.profilePic} />
              <Text style={styles.name}>{pharmacy.name}</Text>
              <Text style={styles.desc}>
                {pharmacy.isOpen ? 'Garde ouverte 🟢' : 'Fermée 🔴'}{"\n"}
                {pharmacy.specialties.join(', ')}
              </Text>
              <Text style={styles.rating}>⭐ {pharmacy.rating} ({pharmacy.reviewCount})</Text>
            </View>
          ))}
        </ScrollView>

        {/* Nearby doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Médecins à proximité</Text>
          <TouchableOpacity><Text style={styles.viewAll}>Voir tous</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctors.map(doctor => (
            <View key={doctor.id} style={styles.card}>
              <View style={styles.profilePic} />
              <Text style={styles.name}>{doctor.name}</Text>
              <Text style={styles.desc}>
                {doctor.isAvailable ? 'Disponible 🟢' : 'Indisponible 🔴'}{"\n"}
                {doctor.specialties.join(', ')}
              </Text>
              <Text style={styles.rating}>⭐ {doctor.rating} ({doctor.reviewCount})</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home" size={24} color="#4CAF50" /></TouchableOpacity>
        <TouchableOpacity><MaterialIcons name="shopping-cart" size={24} color="#888" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="chatbubble-ellipses-outline" size={24} color="#888" /></TouchableOpacity>
        <TouchableOpacity><FontAwesome name="user-o" size={24} color="#888" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logoText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 10, paddingHorizontal: 10, height: 45, marginBottom: 16 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1 },
  suggestionCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  pharmacyInfo: { flexDirection: 'row', alignItems: 'center' },
  imagePlaceholder: { width: 50, height: 50, backgroundColor: '#ddd', borderRadius: 10, marginRight: 12 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardSub: { color: '#777', fontSize: 13 },
  getButton: { backgroundColor: '#E8F5E9', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
  getButtonText: { color: '#4CAF50', fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  viewAll: { color: '#4CAF50', fontSize: 13 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginRight: 12, width: 180, elevation: 2 },
  profilePic: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginBottom: 8 },
  name: { fontWeight: 'bold' },
  desc: { fontSize: 12, color: '#777' },
  rating: { fontSize: 12, marginTop: 4, color: '#fbc02d' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', marginTop: 10 },
});

export default HomeScreen;
