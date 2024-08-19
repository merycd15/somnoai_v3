import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MyDreamScreen = ({ route }) => {
  // Recibe los datos del reloj
  const { data: sleepData } = route.params || {};

  // Verifica que sleepData tenga los datos esperados
  const apneaPercentage = sleepData?.apneaPercentage || 'No disponible';
  const sleepScore = sleepData?.sleepScore || 'No disponible';

  // Proporciona un valor predeterminado para stats si no existe
  const stats = sleepData?.stats || [];

  // Debugging: Verifica el contenido de sleepData y stats
  console.log('sleepData:', sleepData);
  console.log('stats:', stats);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/myDream.png')} style={styles.icon} />
        <Text style={styles.title}>Mi Sueño</Text>
      </View>

      <View style={styles.infoBox}>
        <Image source={require('../assets/info.png')} style={styles.infoIcon} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>PORCENTAJE DE APNEA</Text>
          <Text style={styles.infoValue}>{apneaPercentage}%</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Image source={require('../assets/sleepScore.png')} style={styles.infoIcon} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>PUNTUACION SUEÑO</Text>
          <Text style={styles.infoValue}>{sleepScore}</Text>
        </View>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>ESTADISTICAS</Text>
        <View style={styles.statsGraph}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.bar, { height: stat.height || 50 }]} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: '10%',
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    height: '18%',
  },
  infoIcon: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  statsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    height: '18%',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  statsGraph: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bar: {
    width: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});

export default MyDreamScreen;
