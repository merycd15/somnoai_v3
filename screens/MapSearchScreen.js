import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapSearchScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.google.com/maps/search/apnea+del+sue%C3%B1o+hospitales/@-34.6077037,-58.4140004,13z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapSearchScreen;
