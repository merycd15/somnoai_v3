import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, Juan!</Text>
          <Text style={styles.subGreeting}>¿Cómo estás el día de hoy?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('InfoScreen')}>
        {/* Acá no iría a una pantalla, si no que tomaría los datos de algún lado o esa era la idea, de última se agrega una pantalla pero hay que agregarla al docu */}
        <Image source={require('../assets/info.png')} style={styles.infoIcon} />
        <Text style={styles.infoText}>APNEA QUE ES + INFO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sleepScoreBox} onPress={() => navigation.navigate('StatisticsScreen')}>
        {/* Acá no iría a una pantalla, si no que tomaría los datos del smartwatch o esa era la idea, de última se agrega una pantalla pero hay que agregarla al docu */}
        <Image source={require('../assets/sleepScore.png')} style={styles.sleepIcon} />
        <Text style={styles.sleepScoreText}>PUNTUACION SUEÑO</Text>
      </TouchableOpacity>

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
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('MyDreamScreen')}>
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
  infoBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0EFFF',
    borderRadius: 20,
    alignItems: 'flex-start', // Alinea el contenido a la izquierda
    width: '100%', // Ancho deseado
    height: '45%', // Altura deseada
    position: 'relative', // Permite usar posicionamiento absoluto dentro del contenedor
  },
  infoIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    position: 'absolute', // Posicionamiento absoluto dentro del contenedor
    top: 20, // Ajusta la posición desde la parte superior del recuadro
    left: 20, // Ajusta la posición desde la parte izquierda del recuadro
  },
  infoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: '50%', // Añade un margen superior para que el texto no se superponga con la imagen
    alignSelf:'center',
  },
  sleepScoreBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Centra verticalmente los elementos dentro del contenedor
    width: '100%', // Ancho deseado
    height: '20%', // Altura deseada
  },
  sleepIcon: {
    width: 100,
    height: 100,
    marginRight: 10, // Espacio entre la imagen y el texto
  },
  sleepScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    alignSelf: 'flex-start', // Alinea el texto a la parte superior del contenedor
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
