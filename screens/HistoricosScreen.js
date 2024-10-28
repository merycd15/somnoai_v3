import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HistoricosScreen = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistoricos = async () => {
      try {
        const response = await axios.get('https://proyectosomnoai.onrender.com/SomnoAI/informesHistoricos/');
        setInformes(response.data || []);
      } catch (error) {
        console.error('Error al obtener los informes:', error);
        setInformes([
          { id: 1, date: '01/10/2024' },
          { id: 2, date: '02/10/2024' },
          { id: 3, date: '03/10/2024' },
          { id: 4, date: '04/10/2024' },
          { id: 5, date: '05/10/2024' }
        ]); // Si hay error, aseguramos estado vacío
      } finally {
        setLoading(false);
      }
    };


    fetchHistoricos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1b50a6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informes Históricos</Text>
      {informes.length === 0 ? (
        <Text style={styles.noDataText}>No hay informes disponibles</Text>
      ) : (
        informes.map((informe) => (
          <TouchableOpacity
            key={informe.id}
            style={styles.informeItem}
            onPress={() =>
              navigation.navigate('DetalleInformeScreen', { date: informe.date, id: informe.id })
            }
          >
            <Text style={styles.informeText}>Informe {informe.date}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#b3c0d6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#345c9c',
    textAlign: 'center',
  },
  informeItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#1b50a6',
    borderRadius: 15,
    alignItems: 'center',
  },
  informeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3c0d6',
  },
});

export default HistoricosScreen;
