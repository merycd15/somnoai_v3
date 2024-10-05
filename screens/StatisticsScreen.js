import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const StatisticsScreen = () => {
  const [sleepData, setSleepData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/predecirApnea/', {
          parametro: 'valor_cualquiera'  // Puedes pasar cualquier parámetro necesario
        });

        // Actualizar el estado con la respuesta del backend
        const backendData = response.data;
        const data = {
          resultado_apnea: backendData.resultado_apnea,
          heart_rate: backendData.promedio_heart_rate,
          spo2: backendData.promedio_oxigeno,
          respiratory_rate: backendData.promedio_breathing,
          evaluacion_oxigeno: backendData.evaluacion_oxigeno,
          evaluacion_heart_rate: backendData.evaluacion_heart_rate,
          evaluacion_breathing: backendData.evaluacion_breathing
        };

        setSleepData(data);
        console.log('Data from backend:', backendData);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    };

    fetchData();
  }, []);

  const handlePress = (stat) => {
    setSelectedStat(stat);
    setModalVisible(true);
  };

  const getStatInfo = (stat) => {
    const statInfo = {
      heart_rate: {
        title: "Frecuencia Cardíaca",
        description: "La frecuencia cardíaca promedio durante el sueño. Un valor más bajo generalmente indica un buen descanso.",
        normalRange: "60-100 bpm",
        userStatus: sleepData.heart_rate >= 60 && sleepData.heart_rate <= 100 ? "Normal" : "Fuera de rango",
        iaAnalysis: sleepData.evaluacion_heart_rate ? `Análisis IA: ${sleepData.evaluacion_heart_rate}` : null
      },
      spo2: {
        title: "Oxígeno en Sangre (SpO2)",
        description: "El nivel de oxígeno en sangre indica qué tan bien tu cuerpo está absorbiendo oxígeno.",
        normalRange: "95-100%",
        userStatus: sleepData.spo2 >= 95 ? "Normal" : "Bajo",
        iaAnalysis: sleepData.evaluacion_oxigeno ? `Análisis IA: ${sleepData.evaluacion_oxigeno}` : null
      },
      respiratory_rate: {
        title: "Frecuencia Respiratoria",
        description: "Número de respiraciones por minuto durante el sueño.",
        normalRange: "12-20 respiraciones/min",
        userStatus: sleepData.respiratory_rate >= 12 && sleepData.respiratory_rate <= 20 ? "Normal" : "Fuera de rango",
        iaAnalysis: sleepData.evaluacion_breathing ? `Análisis IA: ${sleepData.evaluacion_breathing}` : null
      },
      resultado_apnea: {
        title: "Resultado Apnea",
        description: "Resultado general de la evaluación para la apnea del sueño.",
        normalRange: "Apnea detectada o No hay apnea",
        userStatus: sleepData.resultado_apnea,
        iaAnalysis: sleepData.resultado_apnea ? `Análisis IA: ${sleepData.resultado_apnea}` : null
      }
    };
    return statInfo[stat];
  };

  if (!sleepData) {
    return <Text>Cargando datos...</Text>;
  }

  const statDetails = selectedStat ? getStatInfo(selectedStat) : null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/sleepScore.png')} style={styles.icon} />
        <Text style={styles.title}>Estadísticas de Sueño</Text>
      </View>

      <TouchableOpacity onPress={() => handlePress('heart_rate')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Frecuencia Cardíaca Promedio</Text>
        <Text style={styles.statsValue}>{sleepData.heart_rate} bpm</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('spo2')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Oxígeno en Sangre (SpO2)</Text>
        <Text style={styles.statsValue}>{sleepData.spo2}%</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('respiratory_rate')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Frecuencia Respiratoria</Text>
        <Text style={styles.statsValue}>{sleepData.respiratory_rate} respiraciones/min</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('resultado_apnea')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Resultado Apnea</Text>
        <Text style={styles.statsValue}>{sleepData.resultado_apnea}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {statDetails && (
              <>
                <Text style={styles.modalTitle}>{statDetails.title}</Text>
                <Text style={styles.modalDescription}>{statDetails.description}</Text>
                <Text style={styles.modalNormalRange}>Rango normal: {statDetails.normalRange}</Text>
                <Text style={styles.modalUserStatus}>Tu estado: {statDetails.userStatus}</Text>
                {statDetails.iaAnalysis && (
                  <Text style={styles.modalIaAnalysis}>{statDetails.iaAnalysis}</Text>
                )}
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.historicosContainer}>
        <Button
          title="Históricos"
          onPress={() => navigation.navigate('HistoricosScreen')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  statsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalNormalRange: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  modalUserStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  modalIaAnalysis: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
    fontStyle: 'italic',
  },
  historicosContainer: 
  { marginTop: 20, 
    alignItems: 'center' }
  
});

export default StatisticsScreen;
