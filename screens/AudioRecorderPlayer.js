import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const SleepRecordingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (!isRecording) {
      try {
        const result = await audioRecorderPlayer.startRecorder();
        setIsRecording(true);
        console.log('Recording started:', result);
      } catch (error) {
        console.error('Error al iniciar la grabación:', error);
      }
    } else {
      console.log('Ya está grabando');
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      try {
        const result = await audioRecorderPlayer.stopRecorder();
        setIsRecording(false);
        console.log('Recording stopped:', result);
      } catch (error) {
        console.error('Error al detener la grabación:', error);
      }
    } else {
      console.log('La grabación ya se ha detenido');
    }
  };

  return (
    <View>
      <Text>Grabación de sueño activa</Text>
      <Button title="Iniciar Grabación" onPress={startRecording} />
      <Button title="Detener Grabación" onPress={stopRecording} />
    </View>
  );
};

export default SleepRecordingScreen;
