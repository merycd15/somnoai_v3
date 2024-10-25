import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ResultadosHistoricos = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semana');
  const [data, setData] = useState([]);

  // Simulación de datos históricos
  const dataHistorica = {
    dia: [65, 70, 75, 60, 80, 78, 85],
    semana: [70, 72, 68, 74, 71, 73, 75],
    mes: [70, 75, 73, 80, 82, 78, 79],
  };

  useEffect(() => {
    // Actualiza los datos al cambiar el periodo seleccionado
    setData(dataHistorica[selectedPeriod]);
  }, [selectedPeriod]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Resultados Históricos</Text>

      <View style={styles.periodButtons}>
        {['dia', 'semana', 'mes'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={styles.buttonText}>{period.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <LineChart
        data={{
          labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisSuffix=" BPM"
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#1E3A8A',
          backgroundGradientTo: '#3B82F6',
          decimalPlaces: 1,
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

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Promedio: {Math.round(data.reduce((a, b) => a + b, 0) / data.length)} BPM</Text>
        <Text style={styles.statsText}>Máximo: {Math.max(...data)} BPM</Text>
        <Text style={styles.statsText}>Mínimo: {Math.min(...data)} BPM</Text>
      </View>

      <Text style={styles.sectionTitle}>Eventos Anormales</Text>
      <FlatList
        data={[
          { id: '1', evento: 'Bajo nivel de oxígeno - 3 veces esta semana' },
          { id: '2', evento: 'Ronquidos frecuentes - 5 noches' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.eventItem}>{item.evento}</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  periodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  periodButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  eventItem: {
    fontSize: 16,
    marginVertical: 5,
    paddingLeft: 10,
  },
});

export default ResultadosHistoricos;

/*import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);

  // Iniciar la grabación
  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      } else {
        console.log("Permisos no concedidos");
      }
    } catch (err) {
      console.error("Error al iniciar la grabación", err);
    }
  }

  // Detener la grabación
  async function stopRecording() {
    setRecording(undefined);

    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const newRecording = {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      };
      setRecordings([...recordings, newRecording]);
    } catch (err) {
      console.error("Error al detener la grabación", err);
    }
  }

  // Formatear la duración
  function getDurationFormatted(milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  // Generar la lista de grabaciones
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  // Limpiar las grabaciones
  function clearRecordings() {
    setRecordings([]);
  }

  return (
    <View style={styles.container}>
      <Button 
        title={recording ? 'Stop Recording' : 'Start Recording'} 
        onPress={recording ? stopRecording : startRecording} 
      />
      {getRecordingLines()}
      {recordings.length > 0 && (
        <Button title="Clear Recordings" onPress={clearRecordings} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  fill: {
    flex: 1,
    textAlign: 'center',
  }
});*/
