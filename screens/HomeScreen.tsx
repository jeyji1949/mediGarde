import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ApiService, { Pharmacy, Doctor } from '@/backend/services/data.services';
import LocationService from '@/backend/services/location.services';
import PharmacyCard from '@/components/PharmacyCard';
import DoctorCard from '@/components/DoctorCard'; 

const HomeScreen = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Demander l'autorisation de localisation
      const hasPermission = await LocationService.requestLocationPermission();
      if (!hasPermission) {
        setError("Nous avons besoin de votre localisation pour vous montrer les pharmacies et médecins à proximité.");
        setLoading(false);
        return;
      }
      
      // Obtenir la position actuelle
      const position = await LocationService.getCurrentPosition() as any;
      const { latitude, longitude } = position.coords;
      
      // Récupérer les pharmacies et médecins à proximité
      const [fetchedPharmacies, fetchedDoctors] = await Promise.all([
        ApiService.getPharmacies(latitude, longitude),
        ApiService.getDoctors(latitude, longitude)
      ]);
      
      setPharmacies(fetchedPharmacies);
      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error('Erreur de récupération des données :', error);
      setError("Une erreur est survenue lors de la récupération des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handlePharmacyPress = (pharmacy: Pharmacy) => {
    // Navigation vers la page de détails de la pharmacie
    console.log('Pharmacie sélectionnée:', pharmacy.name);
    // Implémenter la navigation vers la page de détails
  };

  const handleDoctorPress = (doctor: Doctor) => {
    // Navigation vers la page de détails du médecin
    console.log('Médecin sélectionné:', doctor.name);
    // Implémenter la navigation vers la page de détails
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Recherche des pharmacies et médecins à proximité...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#FF5252" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <TextInput placeholder="Recherche une pharmacie ou un médecin" style={styles.searchInput} />
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
        
        {pharmacies.length === 0 ? (
          <Text style={styles.noDataText}>Aucune pharmacie trouvée à proximité</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
            {pharmacies.map(pharmacy => (
              <PharmacyCard 
                key={pharmacy.id} 
                pharmacy={pharmacy} 
                onPress={handlePharmacyPress} 
              />
            ))}
          </ScrollView>
        )}

        {/* Nearby doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Médecins à proximité</Text>
          <TouchableOpacity><Text style={styles.viewAll}>Voir tous</Text></TouchableOpacity>
        </View>
        
        {doctors.length === 0 ? (
          <Text style={styles.noDataText}>Aucun médecin trouvé à proximité</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
            {doctors.map(doctor => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onPress={handleDoctorPress} 
              />
            ))}
          </ScrollView>
        )}
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
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingTop: 50 
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  loadingText: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 16
  },
  errorText: {
    marginTop: 10,
    color: '#FF5252',
    fontSize: 16,
    textAlign: 'center'
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  noDataText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 16
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  logoText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4CAF50' 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    height: 45, 
    marginBottom: 16 
  },
  searchIcon: { 
    marginRight: 8 
  },
  searchInput: { 
    flex: 1 
  },
  suggestionCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#f9f9f9', 
    padding: 12, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  pharmacyInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  imagePlaceholder: { 
    width: 50, 
    height: 50, 
    backgroundColor: '#ddd', 
    borderRadius: 10, 
    marginRight: 12 
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  cardSub: { 
    color: '#777', 
    fontSize: 13 
  },
  getButton: { 
    backgroundColor: '#E8F5E9', 
    paddingVertical: 6, 
    paddingHorizontal: 16, 
    borderRadius: 8 
  },
  getButtonText: { 
    color: '#4CAF50', 
    fontWeight: 'bold' 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  viewAll: { 
    color: '#4CAF50', 
    fontSize: 13 
  },
  cardsContainer: {
    marginBottom: 16
  },
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
    marginBottom: 8 
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
    color: '#fbc02d' 
  },
  distance: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    marginTop: 10 
  },
});

export default HomeScreen;