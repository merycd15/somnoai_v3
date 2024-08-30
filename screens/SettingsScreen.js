import React from 'react';
import { View, Text, Switch, Button } from 'react-native';

const SettingsScreen = () => {
  const [recordInBackground, setRecordInBackground] = useState(false);

  return (
    <View>
      <Text>Configuraciones de grabación:</Text>
      <View>
        <Text>Grabar en segundo plano:</Text>
        <Switch
          value={recordInBackground}
          onValueChange={(value) => setRecordInBackground(value)}
        />
      </View>
      <Button title="Guardar Configuraciones" onPress={() => alert('Configuraciones guardadas')} />
    </View>
  );
};

export default SettingsScreen;
