import * as Location from 'expo-location';
import { getDistance } from 'geolib';

// Typing des données des pharmacies et des médecins
export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  isOpen: boolean;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  imageUrl: string | null;
  distance?: number;
}

export interface Doctor {
  id: number;
  name: string;
  specialties: string[];
  isAvailable: boolean;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  distance?: number;
}

class ApiService {
  private readonly API_BASE_URL = 'https://votre-api-backend.com/api';

  // Fonction pour obtenir la position actuelle
  async getCurrentLocation(): Promise<Location.LocationObject> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission de localisation refusée');
      }

      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error('Erreur de localisation:', error);
      throw error;
    }
  }

  // Adapter les données JSON aux types définis
  private adaptJsonPharmacies(pharmacies: any[]): Pharmacy[] {
    return pharmacies.map(pharmacy => ({
      id: pharmacy.id,
      name: pharmacy.name,
      address: pharmacy.address,
      isOpen: true, // Par défaut, nous supposons que c'est ouvert
      latitude: pharmacy.lat,
      longitude: pharmacy.lng,
      rating: pharmacy.rating || 0,
      reviewCount: 0, // Par défaut
      specialties: ['Garde ouverte'], // Par défaut
      imageUrl: null
    }));
  }

  private adaptJsonDoctors(doctors: any[]): Doctor[] {
    return doctors.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      address: doctor.address,
      isAvailable: true, // Par défaut, nous supposons que c'est disponible
      latitude: doctor.lat,
      longitude: doctor.lng,
      rating: doctor.rating || 0,
      reviewCount: 0, // Par défaut
      specialties: ['Généraliste'], // Par défaut
      imageUrl: null
    }));
  }

  // Récupération des pharmacies avec le rayon et les données fictives
  async getPharmacies(latitude: number, longitude: number, radius: number = 5000): Promise<Pharmacy[]> {
    try {
      // Dans un environnement de production, vous feriez un appel API ici
      // Mais pour le développement, nous utilisons des données fictives
      
      // Option 1: Utiliser les données mockées du service
      const mockPharmacies: Pharmacy[] = [
        {
          id: 1,
          name: 'Pharmacie Centrale',
          address: '123 Avenue Principale',
          isOpen: true,
          latitude: latitude + 0.001,
          longitude: longitude + 0.002,
          rating: 4.8,
          reviewCount: 23,
          specialties: ['Garde ouverte', 'Homéopathie'],
          imageUrl: null
        },
        {
          id: 2,
          name: 'Pharmacie du Marché',
          address: '45 Rue du Commerce',
          isOpen: true,
          latitude: latitude - 0.002,
          longitude: longitude + 0.001,
          rating: 4.6,
          reviewCount: 18,
          specialties: ['Garde ouverte', 'Dermatologie'],
          imageUrl: null
        },
        {
          id: 3,
          name: 'Pharmacie Saint-Louis',
          address: '78 Boulevard de la République',
          isOpen: false,
          latitude: latitude + 0.003,
          longitude: longitude - 0.002,
          rating: 4.5,
          reviewCount: 15,
          specialties: ['Orthopédie', 'Nutrition'],
          imageUrl: null
        },
        {
          id: 4,
          name: 'Grande Pharmacie',
          address: '12 Place de la Mairie',
          isOpen: true,
          latitude: latitude - 0.001,
          longitude: longitude - 0.003,
          rating: 4.9,
          reviewCount: 32,
          specialties: ['Garde ouverte', 'Pédiatrie'],
          imageUrl: null
        },
        // Ajouter les pharmacies du JSON
        {
          id: 5,
          name: 'Pharmacie Ibn Sina',
          address: 'Rue Hassan II, Rabat',
          isOpen: true,
          latitude: 34.020882,
          longitude: -6.841650,
          rating: 4.8,
          reviewCount: 25,
          specialties: ['Garde ouverte'],
          imageUrl: null
        },
        {
          id: 6,
          name: 'Pharmacie Al Amal',
          address: 'Avenue Mohamed V, Rabat',
          isOpen: true,
          latitude: 34.022500,
          longitude: -6.839000,
          rating: 4.6,
          reviewCount: 20,
          specialties: ['Garde ouverte'],
          imageUrl: null
        }
      ];

      // Calculer la distance pour chaque pharmacie
      const pharmaciesWithDistance = mockPharmacies.map(pharmacy => {
        const distance = getDistance(
          { latitude, longitude },
          { latitude: pharmacy.latitude, longitude: pharmacy.longitude }
        );
        
        return {
          ...pharmacy,
          distance: distance // Distance en mètres
        };
      });

      // Filtrer par rayon et trier par distance
      return pharmaciesWithDistance
        .filter(pharmacy => pharmacy.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Erreur lors de la récupération des pharmacies:', error);
      throw error;
    }
  }

  // Récupération des médecins avec le rayon et les données fictives
  async getDoctors(latitude: number, longitude: number, radius: number = 5000): Promise<Doctor[]> {
    try {
      const mockDoctors: Doctor[] = [
        {
          id: 1,
          name: 'Dr. Steeve James',
          specialties: ['Cardiologie', 'Endocrinologie'],
          isAvailable: true,
          latitude: latitude + 0.002,
          longitude: longitude + 0.001,
          rating: 4.8,
          reviewCount: 23,
          imageUrl: null
        },
        {
          id: 2,
          name: 'Dr. Renuka Aptay',
          specialties: ['Généraliste'],
          isAvailable: true,
          latitude: latitude - 0.001,
          longitude: longitude + 0.003,
          rating: 4.7,
          reviewCount: 18,
          imageUrl: null
        },
        {
          id: 3,
          name: 'Dr. Marie Dubois',
          specialties: ['Pédiatrie', 'Allergologie'],
          isAvailable: false,
          latitude: latitude + 0.003,
          longitude: longitude - 0.001,
          rating: 4.9,
          reviewCount: 31,
          imageUrl: null
        },
        {
          id: 4,
          name: 'Dr. Ahmed Benani',
          specialties: ['Dermatologie'],
          isAvailable: true,
          latitude: latitude - 0.002,
          longitude: longitude - 0.002,
          rating: 4.5,
          reviewCount: 15,
          imageUrl: null
        },
        // Ajouter les médecins du JSON
        {
          id: 5,
          name: 'docteur Ibn Sina',
          specialties: ['Généraliste'],
          isAvailable: true,
          latitude: 34.020882,
          longitude: -6.841650,
          rating: 4.5,
          reviewCount: 18,
          imageUrl: null
        }
      ];

      // Calculer la distance pour chaque médecin
      const doctorsWithDistance = mockDoctors.map(doctor => {
        const distance = getDistance(
          { latitude, longitude },
          { latitude: doctor.latitude, longitude: doctor.longitude }
        );
        
        return {
          ...doctor,
          distance: distance // Distance en mètres
        };
      });

      // Filtrer par rayon et trier par distance
      return doctorsWithDistance
        .filter(doctor => doctor.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Erreur lors de la récupération des médecins:', error);
      throw error;
    }
  }
}

export default new ApiService();