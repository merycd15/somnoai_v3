import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('¡Buen día!');
  const [isDaytime, setIsDaytime] = useState(true); 
  const navigation = useNavigation();
  const sleepScore = 85; // Simulación de datos
  const apneaPercentage = 15; // Simulación de datos

  // Simulación de datos del reloj
  const relojData = {
    heartRate: 72,
    oxygenSaturation: 98,
    sleepStages: {
      light: '3h 20m',
      deep: '1h 40m',
      rem: '1h 30m',
    },
    apneaEvents: 10,
    sleepScore: 85,
    apneaPercentage: 15,
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setGreeting('¡Buen día!');
      setIsDaytime(true);
    } else if (currentHour >= 18 && currentHour < 20) {
      setGreeting('¡Buenas tardes!');
      setIsDaytime(false);
    } else {
      setGreeting('¡Buenas noches!');
      setIsDaytime(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting} Juan</Text>
          <Text style={styles.subGreeting}>¿Cómo dormiste hoy?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: 'https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <View style={styles.timeOfDayBox}>
        <Image
          source={isDaytime ? require('../assets/sun.png') : require('../assets/moon.jpg')}
          style={styles.timeOfDayIcon}
        />
        <Text style={styles.timeOfDayText}>{isDaytime ? 'Es de día' : 'Es de noche'}</Text>
      </View>

      <TouchableOpacity style={styles.infoBox}>
        <Text style={styles.infoTitle}>¿Sabías que?</Text>
        <Text style={styles.infoText}>
          La apnea del sueño es un trastorno en el que la respiración se detiene brevemente durante el sueño debido a la obstrucción de las vías respiratorias, lo que interrumpe el sueño y puede causar problemas de salud.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chatBotBox} onPress={() => navigation.navigate('chatbotScreen', { data: relojData })}>
        <Image source={require('../assets/chatbot.jpg')} style={styles.chatBotIcon} />
        <Text style={styles.chatBotText}>Habla con nuestro chatbot</Text>
      </TouchableOpacity>

      <View style={styles.sleepStatsBox}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Puntuación de Sueño</Text>
          <Text style={styles.statValue}>{sleepScore}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>% de Apnea del Sueño</Text>
          <Text style={styles.statValue}>{apneaPercentage}%</Text>
        </View>
      </View>

      <View style={styles.mySpaceContainer}>
        <Text style={styles.mySpaceTitle}>Mi espacio</Text>
        <View style={styles.mySpaceOptions}>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('ContactsScreen')}>
            <Image source={require('../assets/contacts.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Mis contactos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('CentersScreen')}>
            <Image source={require('../assets/centers.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Centros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('MyDreamScreen', { data: relojData })}>
            <Image source={require('../assets/myDream.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Mi sueño</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subGreeting: {
    fontSize: 16,
    color: '#8E8E93',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  timeOfDayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  timeOfDayIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  timeOfDayText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  infoBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0EFFF',
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  chatBotBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBotIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  chatBotText: {
    fontSize: 18,
    color: '#007AFF',
  },
  sleepStatsBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  mySpaceContainer: {
    marginTop: 30,
  },
  mySpaceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A4A4A',
  },
  mySpaceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mySpaceOption: {
    alignItems: 'center',
  },
  mySpaceIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  mySpaceText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4A4A4A',
  },
});

export default HomeScreen;
