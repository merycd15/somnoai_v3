import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const CentersScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      fetchCenters(userLocation.coords);
    })();
  }, []);

  const fetchCenters = async (coords) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${coords.latitude},${coords.longitude}`,
            radius: 10000,
            keyword: 'apnea del sueño hospitales',
            type: 'hospital',
            key: 'AIzaSyDJDfXQxCEaxGHhXxIfoTQvbvGZ9PuLz7k',
          },
        }
      );
      setCenters(response.data.results);
    } catch (error) {
      console.error('Error al buscar centros médicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMapsSearch = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=apnea+del+sueño+hospitales&near=${location.latitude},${location.longitude}`;
      Linking.openURL(url).catch(() =>
        Alert.alert('Error', 'No se pudo abrir Google Maps.')
      );
    } else {
      Alert.alert('Error', 'Ubicación no disponible.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1b50a6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          {centers.map((center, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: center.geometry.location.lat,
                longitude: center.geometry.location.lng,
              }}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{center.name}</Text>
                  <Text>{center.vicinity}</Text>
                  {center.opening_hours && (
                    <Text>
                      {center.opening_hours.open_now ? 'Abierto ahora' : 'Cerrado'}
                    </Text>
                  )}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}
      <TouchableOpacity style={styles.reloadButton} onPress={() => setLoading(true)}>
        <Text style={styles.reloadButtonText}>Actualizar Ubicación</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mapsButton} onPress={openGoogleMapsSearch}>
        <Text style={styles.mapsButtonText}>Buscar en Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3c0d6',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  reloadButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  reloadButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  mapsButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  mapsButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CentersScreen;
