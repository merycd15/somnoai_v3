import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  FlatList, 
  Alert 
} from 'react-native';
import { Audio } from 'expo-av';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const SnoreScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snoreAnalysis, setSnoreAnalysis] = useState('');

  const screenWidth = Dimensions.get('window').width;

  const snoreList = [
    { 
      id: '1', 
      date: '2024-10-28', 
      audio: require('../assets/ronquidos/salamisound-5789888-loud-snoring-sleep-apnea.wav'), 
      spectroData: [40, 54, 55, 55, 90, 48], 
      analysis: 'Ronquido con frecuencia alta. Consulte a Snoory por sugerencias.' 
    },
    { 
      id: '2', 
      date: '2024-10-27', 
      audio: require('../assets/ronquidos/Prueba.wav'), 
      spectroData: [40, 50, 45, 55, 60, 58], 
      analysis: 'Ronquido con frecuencia alta. CConsulte a Snoory por sugerencias.' 
    },
    { 
      id: '', 
      date: '2024-10-26', 
      audio: require('../assets/ronquidos/Ronquido1-normal.wav'), 
      spectroData: [10, 20, 15, 25, 30, 28], 
      analysis: 'Ronquido dentro del rango normal.' 
    },
  ];

  const NORMAL_THRESHOLD = 30;

  const playSnore = async (audio, analysis) => {
    try {
      if (isPlaying && sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setIsPlaying(false);
        setSnoreAnalysis('');
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(audio);
        setSound(newSound);
        setIsPlaying(true);
        setSnoreAnalysis(analysis);
        await newSound.playAsync();

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isPlaying) {
            setIsPlaying(false);
            setSnoreAnalysis('');
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo reproducir el audio');
      console.error('Error al reproducir el audio:', error);
    }
  };

  const renderSnoreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.snoreItem}
      onPress={() => playSnore(item.audio, item.analysis)}
    >
      <Text style={styles.snoreText}>Ronquido del {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={snoreList}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <Text style={styles.title}>Espectro del Último Ronquido</Text>

          <LineChart
            data={{
              labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
              datasets: [{ data: snoreList[0].spectroData }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#1b50a6',
              backgroundGradientTo: '#4a90e2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
            bezier
            withHorizontalLines
            segments={6}
            yAxisSuffix="dB"
            yAxisInterval={10} // Cada línea horizontal representa 10dB
            renderDotContent={({ x, y }) => (
              <View 
                style={{ 
                  position: 'absolute', 
                  top: y - 6, 
                  left: x - 6, 
                  backgroundColor: 'red', 
                  borderRadius: 6, 
                  width: 12, 
                  height: 12 
                }} 
              />
            )}
            decorator={() => (
              <View
                style={{
                  position: 'absolute',
                  top: 220 - (NORMAL_THRESHOLD * 220) / 60,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: 'green',
                }}
              />
            )}
          />

          <TouchableOpacity
            style={styles.playButton}
            onPress={() => playSnore(snoreList[0].audio, snoreList[0].analysis)}
          >
            <Image
              source={require('../assets/play.png')}
              style={styles.playIcon}
            />
            <Text style={styles.playText}>
              {isPlaying ? 'Detener' : 'Reproducir Último Ronquido'}
            </Text>
          </TouchableOpacity>

          {snoreAnalysis !== '' && (
            <Text style={styles.analysisText}>{snoreAnalysis}</Text>
          )}

          <Text style={styles.subtitle}>Historial de Ronquidos</Text>
        </View>
      )}
      renderItem={renderSnoreItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b50a6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  playIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  playText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  analysisText: {
    fontSize: 16,
    color: '#345c9c',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#345c9c',
  },
  snoreItem: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  snoreText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SnoreScreen;
