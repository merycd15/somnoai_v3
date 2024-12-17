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

const DetalleInformeScreen = ({ route }) => {
  const { date, username } = route.params;

  // Normalizamos el username para evitar errores de mayúsculas o espacios
  const normalizedUsername = username?.trim().toLowerCase();

  // Generador dinámico de datos para el informe
  const generateInforme = (isPositive) => {
    const randomValue = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
    if (isPositive) {
      return {
        resultado_apnea: "No hay apnea",
        promedio_oxigeno: randomValue(94, 96),
        evaluacion_oxigeno: "Saturación de oxígeno normal",
        promedio_heart_rate: randomValue(65, 70),
        evaluacion_heart_rate: "Frecuencia cardíaca normal",
        promedio_breathing: randomValue(11, 13),
        evaluacion_breathing: "Respiración estable",
        conclusion: "Sigue así, tus parámetros son óptimos y no se detectaron problemas.",
        consejo: "Mantén tus buenos hábitos para seguir mejorando tu descanso.",
      };
    } else {
      return {
        resultado_apnea: "Positivo para apnea del sueño",
        promedio_oxigeno: randomValue(85, 89),
        evaluacion_oxigeno: "Saturación de oxígeno baja",
        promedio_heart_rate: randomValue(100, 110),
        evaluacion_heart_rate: "Frecuencia cardíaca elevada",
        promedio_breathing: randomValue(22, 27),
        evaluacion_breathing: "Respiración irregular",
        conclusion: "Los resultados indican problemas de apnea. Es recomendable realizar una consulta médica.",
        consejo: "Evita la cafeína antes de dormir y prueba mantener una rutina constante de sueño.",
      };
    }
  };

  // Generamos los datos según el usuario
  const informeFicticio = normalizedUsername === "fercardozo" 
    ? generateInforme(true) // Informe positivo para fercardozo
    : generateInforme(false); // Informe negativo para otros usuarios

  

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
          <p>${informeFicticio.conclusion}</p>
          <p><strong>Consejo:</strong> ${informeFicticio.consejo}</p>
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
      <Text style={styles.conclusionText}>{informeFicticio.conclusion}</Text>
      <Text style={styles.conclusionText}>
     <Text style={styles.boldText}>Consejo:</Text> {informeFicticio.consejo}
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
  boldText: {
    fontWeight: 'bold',
    color: '#4A4A4A', // Color opcional para hacer énfasis
  },
  conclusionText: { 
    fontSize: 16, 
    marginVertical: 5 
  },
});

export default DetalleInformeScreen;
