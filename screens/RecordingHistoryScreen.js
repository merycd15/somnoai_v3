import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const recordings = [
  // Aquí agregarías la lista de grabaciones, puedes cargarla de almacenamiento local o servidor
  { id: '1', date: '2024-08-30', path: 'sdcard/sleep_recording_20240830.mp4' },
  { id: '2', date: '2024-08-29', path: 'sdcard/sleep_recording_20240829.mp4' },
];

const RecordingHistoryScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Historial de grabaciones:</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Grabación del {item.date}</Text>
            <Button
              title="Ver Resultado"
              onPress={() => navigation.navigate('Result', { path: item.path })}
            />
          </View>
        )}
      />
      <Button title="Volver al inicio" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default RecordingHistoryScreen;
