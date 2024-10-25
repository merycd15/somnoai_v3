import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const MonitoreoEnVivo = () => {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [recording, setRecording] = useState(false);

  // Simulación de datos en vivo
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 100);
      setData((prevData) => [...prevData.slice(-9), randomValue]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    setConnected(!connected);
  };

  const handleRecord = () => {
    setRecording(!recording);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitoreo en Vivo</Text>

      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <Text style={styles.buttonText}>
          {connected ? 'Desconectar Smartwatch' : 'Conectar Smartwatch'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.statusText}>
        {connected ? 'Smartwatch Conectado' : 'Sin conexión'}
      </Text>

      <View style={styles.dataContainer}>
        <Text>Frecuencia Cardíaca: {Math.floor(Math.random() * 100)} BPM</Text>
        <Text>Nivel de Oxígeno: {Math.floor(Math.random() * 10) + 90}%</Text>
        <Text>Presión Arterial: {120 + Math.floor(Math.random() * 20)} / 80</Text>
      </View>

      <LineChart
        data={{
          labels: ['0s', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" BPM"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
        <Text style={styles.buttonText}>
          {recording ? 'Detener Grabación' : 'Iniciar Grabación'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  dataContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default MonitoreoEnVivo;

/*import React from 'react';
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

export default MyDreamScreen;*/
