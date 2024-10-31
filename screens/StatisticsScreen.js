import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Button 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const StatisticsScreen = () => {
  const [sleepData, setSleepData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/predecirApnea/', {
          parametro: 'valor_cualquiera',
        });
        const backendData = response.data;

        /*const data = {
          resultado_apnea: backendData.resultado_apnea ?? '-',
          heart_rate: backendData.promedio_heart_rate != null ? backendData.promedio_heart_rate.toFixed(2) : '-',
          spo2: backendData.promedio_oxigeno != null ? backendData.promedio_oxigeno.toFixed(2) : '-',
          respiratory_rate: backendData.promedio_breathing != null ? backendData.promedio_breathing.toFixed(2) : '-',
          evaluacion_oxigeno: backendData.evaluacion_oxigeno ?? '-',
          evaluacion_heart_rate: backendData.evaluacion_heart_rate ?? '-',
          evaluacion_breathing: backendData.evaluacion_breathing ?? '-',
        };*/
        const data = {
          resultado_apnea: "Positivo para apnea del sueño",
          heart_rate: "105.40",
          spo2: "88.20",
          respiratory_rate: "25.00",
          evaluacion_oxigeno: "Saturación de oxígeno baja",
          evaluacion_heart_rate: "Frecuencia cardíaca elevada",
          evaluacion_breathing: "Respiración irregular",
        };
        

        setSleepData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSleepData({});
      }
    };
    fetchData();
  }, []);

  const handlePress = (stat) => {
    setSelectedStat(stat);
    setModalVisible(true);
  };

  const getStatInfo = (stat) => ({
    heart_rate: {
      title: 'Frecuencia Cardíaca',
      description: 'Frecuencia cardíaca promedio durante el sueño.',
      normalRange: '60-100 bpm',
      userStatus: sleepData.heart_rate >= 60 && sleepData.heart_rate <= 100 ? 'Normal' : 'Fuera de rango',
      iaAnalysis: sleepData.evaluacion_heart_rate,
    },
    spo2: {
      title: 'Oxígeno en Sangre (SpO2)',
      description: 'Nivel de oxígeno en sangre.',
      normalRange: '95-100%',
      userStatus: sleepData.spo2 >= 95 ? 'Normal' : 'Bajo',
      iaAnalysis: sleepData.evaluacion_oxigeno,
    },
    respiratory_rate: {
      title: 'Frecuencia Respiratoria',
      description: 'Número de respiraciones por minuto.',
      normalRange: '12-20 respiraciones/min',
      userStatus: sleepData.respiratory_rate >= 12 && sleepData.respiratory_rate <= 20 ? 'Normal' : 'Fuera de rango',
      iaAnalysis: sleepData.evaluacion_breathing,
    },
    resultado_apnea: {
      title: 'Resultado Apnea',
      description: 'Evaluación general de la apnea del sueño.',
      normalRange: 'Sin apnea / Con apnea',
      userStatus: sleepData.resultado_apnea,
      iaAnalysis: sleepData.resultado_apnea,
    },
  }[stat]);

  const statDetails = selectedStat ? getStatInfo(selectedStat) : null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/sleepScore.png')} style={styles.icon} />
        <Text style={styles.title}>Estadísticas de Sueño</Text>
      </View>

      <Text style={styles.instructions}>Toca una tarjeta para ver más detalles</Text>

      {['heart_rate', 'spo2', 'respiratory_rate', 'resultado_apnea'].map((stat) => (
        <TouchableOpacity 
          key={stat} 
          onPress={() => handlePress(stat)} 
          style={styles.statsBox}
          activeOpacity={0.7}
        >
          <View style={styles.statsContent}>
            <View style={styles.statTextContainer}>
              <Text style={styles.statsTitle}>{getStatInfo(stat).title}</Text>
              <Text style={styles.statsValue}>
                {sleepData[stat]} {stat === 'spo2' ? '%' : ''}
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      ))}

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
                  <Text style={styles.modalIaAnalysis}>Análisis IA: {statDetails.iaAnalysis}</Text>
                )}
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.historicosContainer}>
        <Button title="Históricos" onPress={() => navigation.navigate('HistoricosScreen')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#b3c0d6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#345c9c',
  },
  instructions: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsBox: {
    backgroundColor: '#1b50a6',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  statsValue: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
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
    color: '#4A4A4A',
    marginBottom: 10,
  },
  modalUserStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b50a6',
    marginBottom: 20,
  },
  modalIaAnalysis: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
  },
  historicosContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StatisticsScreen;
