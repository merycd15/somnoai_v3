import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated,
} from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import { useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('¡Buenas noches!');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const route = useRoute(); // Hook para acceder a los parámetros
  const { username } = route.params || {}; // Recibimos el parámetro 'username'

  const results = username === "Flopez"
    ? { // Datos para flopez (apnea)
        resultado_apnea: "Apnea moderada detectada",
        promedio_oxigeno: 88.5,
        evaluacion_oxigeno: "Saturación de oxígeno baja",
        promedio_heart_rate: 80.5,
        evaluacion_heart_rate: "Frecuencia cardíaca elevada",
        promedio_breathing: 6.0,
        evaluacion_breathing: "Respiración muy baja",
      }
    : { // Datos para fercardozo (sin apnea)
        resultado_apnea: "No hay apnea",
        promedio_oxigeno: 95.11225,
        evaluacion_oxigeno: "Saturación de oxígeno normal",
        promedio_heart_rate: 67.91,
        evaluacion_heart_rate: "Frecuencia cardíaca normal",
        promedio_breathing: 11.0,
        evaluacion_breathing: "Respiración baja",
      };

  const sleepScore = username === "Flopez" ? 55 : 85;
  // Observaciones dinámicas
  const observations = [];
  if (results.resultado_apnea === "No hay apnea") {
    observations.push("¡Buen trabajo! No se detectaron eventos de apnea.");
  } else {
    observations.push("Atención: Se detectó apnea del sueño. Consulta a un médico.");
  }

  if (results.evaluacion_breathing.includes("baja")) {
    observations.push("Tu ritmo de respiración es más bajo de lo normal. Monitorea tus hábitos de sueño.");
  }

  if (results.evaluacion_oxigeno.includes("normal")) {
    observations.push("La saturación de oxígeno es excelente, sigue así.");
  }

  if (results.evaluacion_heart_rate.includes("normal")) {
    observations.push("Tu frecuencia cardíaca se encuentra dentro de un rango saludable.");
  }

  // Función para determinar el color de la barra según el puntaje
  const getBarColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Verde: Excelente
    if (score >= 60) return '#FFEB3B'; // Amarillo: Regular
    return '#F44336'; // Rojo: Malo
  };

  useEffect(() => {
    // Animación de fade-in al cargar la pantalla.
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Saludo dinámico según la hora.
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) setGreeting('¡Buenos días!');
    else if (currentHour >= 12 && currentHour < 18) setGreeting('¡Buenas tardes!');
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gráfico de Barras */}
        <Text style={styles.sectionTitle}>Calidad del Sueño</Text>
        <View style={styles.barContainer}>
          <ProgressBar
            progress={sleepScore / 100} // Convertimos el puntaje a decimal
            width={Dimensions.get('window').width - 40}
            color={getBarColor(sleepScore)}
            borderRadius={10}
            height={20}
            animated={true}
          />
          <Text style={styles.scoreText}>
            {sleepScore} - {sleepScore >= 80 ? 'Excelente' : sleepScore >= 60 ? 'Regular' : 'Malo'}
          </Text>
        </View>

        {/* Observaciones */}
        <View style={styles.observationsContainer}>
          <Text style={styles.sectionTitle}>Observaciones</Text>
          {observations.map((obs, index) => (
            <Card key={index} style={styles.observationCard}>
              <Text style={styles.observationText}>{obs}</Text>
            </Card>
          ))}
        </View>

        {/* Tarjetas de Navegación */}
        <Text style={styles.sectionTitle}>Mi espacio</Text>
        <View style={styles.cardsContainer}>
          {[
            { id: '1', name: 'Centros Médicos', screen: 'CentersScreen', icon: require('../assets/centers.png') },
            { id: '2', name: 'Estadísticas', screen: 'StatisticsScreen', icon: require('../assets/myDream.png') },
            { id: '3', name: 'Históricos', screen: 'HistoricosScreen', icon: require('../assets/history.png') },
            { id: '4', name: 'Laboratorio del ronquido', screen: 'AudioRecorderPlayer', icon: require('../assets/lab.png') },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image source={item.icon} style={styles.cardIcon} />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
          {/* Sección del Chatbot */}
          <View style={styles.chatbotContainer}>
          <Image source={require('../assets/chatbot.jpg')} style={styles.chatbotIcon} />
          <TouchableOpacity
            style={styles.chatbotButton}
            onPress={() => navigation.navigate('chatbotScreen')}
          >
            <Text style={styles.chatbotText}>💬 Habla con Snoory</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#345c9c',
  },
  date: {
    fontSize: 16,
    color: '#8E8E93',
  },
  settingsIcon: {
    width: 40,
    height: 40,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#345c9c',
    marginBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  observationsContainer: {
    marginBottom: 10,
  },
  observationCard: {
    backgroundColor: '#1b50a6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  observationText: {
    color: '#FFF',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1b50a6',
    width: (Dimensions.get('window').width - 60) / 2,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    color: '#B0C4DE',
    fontSize: 18,
    textAlign: 'center',
  },
  chatbotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1b50a6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  chatbotIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatbotButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  chatbotText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;
