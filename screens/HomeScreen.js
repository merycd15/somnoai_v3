import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('¡Buenas noches!');
  const navigation = useNavigation();
  const sleepScore = 0.85; // 85% representado como valor entre 0 y 1
  const apneaPercentage = 15;

  const spaceOptions = [
    { id: '1', name: 'Mis Contactos', icon: require('../assets/contacts.png'), screen: 'ContactsScreen' },
    { id: '2', name: 'Centros', icon: require('../assets/centers.png'), screen: 'CentersScreen' },
    { id: '3', name: 'Grabaciones', icon: require('../assets/audio.png'), screen: 'AudioRecorderPlayer' },
    { id: '4', name: 'Mi Sueño', icon: require('../assets/myDream.png'), screen: 'MyDreamScreen' },
  ];

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) setGreeting('¡Buenos días!');
    else if (currentHour >= 12 && currentHour < 18) setGreeting('¡Buenas tardes!');
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/night-sky.jpg')} style={styles.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting} Fernando</Text>
          <Text style={styles.subGreeting}>Esperamos que hayas descansado bien</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartContainer}>
          <ProgressChart
            data={{
              labels: ['Sueño'], // Etiqueta
              data: [sleepScore], // 85%
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            strokeWidth={16}
            radius={50}
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            hideLegend={false}
          />
          <Text style={styles.chartLabel}>Puntuación del Sueño: {Math.round(sleepScore * 100)}%</Text>
        </View>

        <View style={styles.mySpaceContainer}>
          <Text style={styles.sectionTitle}>Mi Espacio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {spaceOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.spaceOption}
                onPress={() => navigation.navigate(option.screen)}
              >
                <Image source={option.icon} style={styles.spaceIcon} />
                <Text style={styles.spaceText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('chatbotScreen')}>
        <Text style={styles.floatingButtonText}>💬</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 50 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#FFD700' },
  subGreeting: { fontSize: 18, color: '#B0C4DE' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  content: { padding: 20, alignItems: 'center' },
  chartContainer: { alignItems: 'center', marginVertical: 20 },
  chartLabel: { fontSize: 18, color: '#FFF', marginTop: 10 },
  mySpaceContainer: { marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  spaceOption: { alignItems: 'center', marginHorizontal: 10 },
  spaceIcon: { width: 60, height: 60, marginBottom: 5 },
  spaceText: { color: '#B0C4DE' },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  floatingButtonText: { fontSize: 30, color: '#000' },
});

export default HomeScreen;



/*import React, { useState, useEffect } from 'react';
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
          <Text style={styles.greeting}>{greeting} Fernando</Text>
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
        <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('StatisticsScreen')}>
          <Text style={styles.statTitle}>Puntuación de Sueño</Text>
          <Text style={styles.statValue}>{sleepScore}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('StatisticsScreen')}>
          <Text style={styles.statTitle}>% de Apnea del Sueño</Text>
          <Text style={styles.statValue}>{apneaPercentage}%</Text>
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('AudioRecorderPlayer', { data: relojData })}>
            <Image source={require('../assets/myDream.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Grabaciones</Text>
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

export default HomeScreen;*/
