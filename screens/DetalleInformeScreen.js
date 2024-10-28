import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const informeFicticio = {
  resultado_apnea: "No hay apnea",
  promedio_oxigeno: 65.71,
  evaluacion_oxigeno: "Saturación de oxígeno baja",
  promedio_heart_rate: 67.91,
  evaluacion_heart_rate: "Frecuencia cardíaca normal",
  promedio_breathing: 6,
  evaluacion_breathing: "Respiración baja",
};

const DetalleInformeScreen = ({ route }) => {
  const { date } = route.params;

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1 style="text-align: center;">Informe del ${date}</h1>
          <h2>Resultado Apnea</h2>
          <p>${informeFicticio.resultado_apnea}</p>
          <h2>Promedio de Oxígeno</h2>
          <p>${informeFicticio.promedio_oxigeno}% - ${informeFicticio.evaluacion_oxigeno}</p>
          <h2>Frecuencia Cardíaca</h2>
          <p>${informeFicticio.promedio_heart_rate} bpm - ${informeFicticio.evaluacion_heart_rate}</p>
          <h2>Respiración</h2>
          <p>${informeFicticio.promedio_breathing} respiraciones/min - ${informeFicticio.evaluacion_breathing}</p>
          <h2>Conclusión</h2>
          <p>Frecuencia máxima de 120 Hz observada en los ronquidos. 
             Se recomienda realizar una evaluación médica si los niveles persisten.</p>
          <p>Consejo: Reducir la ingesta de cafeína antes de dormir puede mejorar la respiración.</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generado en:', uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Compartir no disponible', 'No se puede compartir este PDF en este dispositivo.');
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe del {date}</Text>

      <Text style={styles.sectionTitle}>Resultado Apnea:</Text>
      <Text>{informeFicticio.resultado_apnea}</Text>

      <Text style={styles.sectionTitle}>Promedio de oxígeno:</Text>
      <Text>{informeFicticio.promedio_oxigeno}% - {informeFicticio.evaluacion_oxigeno}</Text>

      <Text style={styles.sectionTitle}>Frecuencia cardíaca:</Text>
      <Text>{informeFicticio.promedio_heart_rate} bpm - {informeFicticio.evaluacion_heart_rate}</Text>

      <Text style={styles.sectionTitle}>Respiración:</Text>
      <Text>{informeFicticio.promedio_breathing} respiraciones/min - {informeFicticio.evaluacion_breathing}</Text>

      <Image source={require('../assets/Frecuencias.png')} style={styles.image} />

      <Text style={styles.conclusionTitle}>Conclusión</Text>
      <Text style={styles.conclusionText}>
        Frecuencia máxima de 120 Hz observada en los ronquidos. 
        Se recomienda realizar una evaluación médica si los niveles persisten.
      </Text>
      <Text style={styles.conclusionText}>
        Consejo: Reducir la ingesta de cafeína antes de dormir puede mejorar la respiración.
      </Text>

      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Descargar Informe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#FFFFFF', 
    flexGrow: 1 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#4A4A4A' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 20, 
    color: '#007AFF' 
  },
  image: { 
    width: '100%', 
    height: 200, 
    resizeMode: 'contain', 
    marginVertical: 20 
  },
  conclusionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20 
  },
  conclusionText: { 
    fontSize: 16, 
    marginVertical: 5 
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalleInformeScreen;
