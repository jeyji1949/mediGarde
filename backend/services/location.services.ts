import * as Location from 'expo-location';
import { PermissionsAndroid, Platform } from 'react-native';

class LocationService {
  // Demander les autorisations de localisation sur Android
  async requestLocationPermission() {
    if (Platform.OS === 'ios') {
      return true;
    }
    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Autorisation de localisation",
          message: "mediGarde a besoin d'accéder à votre localisation pour trouver les pharmacies et médecins à proximité",
          buttonNeutral: "Demander plus tard",
          buttonNegative: "Annuler",
          buttonPositive: "OK"
        }
      );
      
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Erreur lors de la demande d\'autorisation de localisation:', err);
      return false;
    }
  }

  // Obtenir la position actuelle de l'utilisateur
  getCurrentPosition() {
    return new Promise(async (resolve, reject) => {
      const hasPermission = await this.requestLocationPermission();
      
      if (!hasPermission) {
        reject('Autorisation de localisation non accordée');
        return;
      }

      try {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        resolve(position);
      } catch (error) {
        console.warn('Erreur de géolocalisation:', error);
        reject(error);
      }
    });
  }
}

export default new LocationService();
