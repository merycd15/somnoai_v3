import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const informes = [
  { id: 1, date: '01/10/2024' },
  { id: 2, date: '02/10/2024' },
  { id: 3, date: '03/10/2024' },
  { id: 4, date: '04/10/2024' },
  { id: 5, date: '05/10/2024' }
];

const HistoricosScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informes Históricos</Text>
      {informes.map((informe) => (
        <TouchableOpacity
          key={informe.id}
          style={styles.informeItem}
          onPress={() => navigation.navigate('DetalleInformeScreen', { date: informe.date })}
        >
          <Text style={styles.informeText}>Informe {informe.date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4A4A4A' },
  informeItem: { padding: 20, marginBottom: 10, backgroundColor: '#F5F5F5', borderRadius: 15 },
  informeText: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' }
});

export default HistoricosScreen;
