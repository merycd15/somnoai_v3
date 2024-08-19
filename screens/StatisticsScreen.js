import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StatisticsScreen = () => {
  const [sleepData, setSleepData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        heart_rate: 65,
        spo2: 95,
        sleep_stages: {
          light: 150,
          deep: 60,
          rem: 90
        },
        snore_index: 3,
        respiratory_rate: 16,
        sleep_score: 85,
        movement: 20,
        total_sleep: 480 // minutos
      };
      setSleepData(data);
    };

    fetchData();
  }, []);

  const handlePress = (stat) => {
    setSelectedStat(stat);
    setModalVisible(true);
  };

  const getStatInfo = (stat) => {
    const statInfo = {
      sleep_score: {
        title: "Puntuación del Sueño",
        description: "La puntuación del sueño refleja la calidad general de tu sueño. Un puntaje más alto indica un mejor descanso.",
        normalRange: "70-100",
        userStatus: sleepData.sleep_score >= 70 ? "Normal" : "Bajo"
      },
      heart_rate: {
        title: "Frecuencia Cardíaca",
        description: "La frecuencia cardíaca promedio durante el sueño. Un valor más bajo generalmente indica un buen descanso.",
        normalRange: "60-100 bpm",
        userStatus: sleepData.heart_rate >= 60 && sleepData.heart_rate <= 100 ? "Normal" : "Fuera de rango"
      },
      spo2: {
        title: "Oxígeno en Sangre (SpO2)",
        description: "El nivel de oxígeno en sangre indica qué tan bien tu cuerpo está absorbiendo oxígeno.",
        normalRange: "95-100%",
        userStatus: sleepData.spo2 >= 95 ? "Normal" : "Bajo"
      },
      respiratory_rate: {
        title: "Frecuencia Respiratoria",
        description: "Número de respiraciones por minuto durante el sueño.",
        normalRange: "12-20 respiraciones/min",
        userStatus: sleepData.respiratory_rate >= 12 && sleepData.respiratory_rate <= 20 ? "Normal" : "Fuera de rango"
      },
      snore_index: {
        title: "Índice de Ronquidos",
        description: "El índice de ronquidos mide la frecuencia de los ronquidos durante la noche.",
        normalRange: "0-5",
        userStatus: sleepData.snore_index <= 5 ? "Normal" : "Elevado"
      },
      total_sleep: {
        title: "Duración del Sueño",
        description: "La cantidad total de sueño durante la noche.",
        normalRange: "7-9 horas",
        userStatus: (sleepData.total_sleep / 60) >= 7 && (sleepData.total_sleep / 60) <= 9 ? "Normal" : "Fuera de rango"
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

      <TouchableOpacity onPress={() => handlePress('sleep_score')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Puntuación del Sueño</Text>
        <Text style={styles.statsValue}>{sleepData.sleep_score}</Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => handlePress('total_sleep')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Duración del Sueño</Text>
        <Text style={styles.statsValue}>{(sleepData.total_sleep / 60).toFixed(1)} horas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('snore_index')} style={styles.statsBox}>
        <Text style={styles.statsTitle}>Índice de Ronquidos</Text>
        <Text style={styles.statsValue}>{sleepData.snore_index}</Text>
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
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
});

export default StatisticsScreen;
