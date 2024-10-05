import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const informeFicticio = {
  resultado_apnea: "No hay apnea",
  promedio_oxigeno: 65.71,
  evaluacion_oxigeno: "Saturación de oxígeno baja",
  promedio_heart_rate: 67.91,
  evaluacion_heart_rate: "Frecuencia cardíaca normal",
  promedio_breathing: 6,
  evaluacion_breathing: "Respiración baja"
};

const DetalleInformeScreen = ({ route }) => {
  const { date } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe del {date}</Text>

      <Text style={styles.sectionTitle}>Resultado Apnea: {informeFicticio.resultado_apnea}</Text>
      <Text>Promedio de oxígeno: {informeFicticio.promedio_oxigeno}</Text>
      <Text>{informeFicticio.evaluacion_oxigeno}</Text>

      <Text>Frecuencia cardíaca: {informeFicticio.promedio_heart_rate}</Text>
      <Text>{informeFicticio.evaluacion_heart_rate}</Text>

      <Text>Respiración: {informeFicticio.promedio_breathing}</Text>
      <Text>{informeFicticio.evaluacion_breathing}</Text>

      {/* Imagen fija de frecuencia de dominio */}
      <Image source={require('../assets/Frecuencias.png')} style={styles.image} />

      <Text style={styles.conclusionTitle}>Conclusión</Text>
      <Text style={styles.conclusionText}>
        Frecuencia máxima de 120 Hz observada en los ronquidos. 
        Se recomienda realizar una evaluación médica si los niveles persisten.
      </Text>
      <Text style={styles.conclusionText}>
        Consejo: Reducir la ingesta de cafeína antes de dormir puede mejorar la respiración.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4A4A4A' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, color: '#007AFF' },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 20 },
  conclusionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  conclusionText: { fontSize: 16, marginVertical: 5 }
});

export default DetalleInformeScreen;
