import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated,
} from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('¡Buenas noches!');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

  const sleepScore = 85;
  const observations = [
    'Tu puntuación de sueño bajó un 10%. Intenta acostarte más temprano.',
    'Detectamos 5 eventos apneicos. Te recomendamos hablar con un médico.',
  ];

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
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tarjeta de Puntaje */}
        <Card style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Puntuación del Sueño</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{sleepScore}</Text>
          </View>
        </Card>

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
            { id: '2', name: 'Histórico', screen: 'AudioRecorderPlayer', icon: require('../assets/history.png') },
            { id: '3', name: 'Detalle del Sueño', screen: 'MyDreamScreen', icon: require('../assets/myDream.png') },
            { id: '4', name: 'Estadísticas', screen: 'StatisticsScreen', icon: require('../assets/info.png') },
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
    marginTop: 50,
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
  scoreCard: {
    backgroundColor: '#1b50a6',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
  },
  scoreTitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00FF00',
  },
  observationsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#345c9c',
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
