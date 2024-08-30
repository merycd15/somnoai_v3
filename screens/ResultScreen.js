import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { path } = route.params;
  const [result, setResult] = useState(null);

  useEffect(() => {
    const sendAudioForAnalysis = async () => {
      const data = new FormData();
      data.append('audio', {
        uri: `file://${path}`,
        name: 'sleep_recording.mp4',
        type: 'audio/mp4',
      });

      try {
        const response = await fetch('YOUR_ANALYSIS_API_ENDPOINT', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();
        setResult(result);
      } catch (error) {
        console.error('Error sending audio for analysis', error);
      }
    };

    sendAudioForAnalysis();
  }, [path]);

  return (
    <View>
      {result ? (
        <>
          <Text>Resultado del análisis:</Text>
          <Text>{result.summary}</Text>
          <Text>Recomendaciones:</Text>
          <Text>{result.recommendations}</Text>
        </>
      ) : (
        <Text>Analizando...</Text>
      )}
      <Button title="Volver al inicio" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default ResultScreen;
