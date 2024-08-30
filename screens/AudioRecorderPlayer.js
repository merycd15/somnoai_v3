import React, { useState } from 'react';
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
});
