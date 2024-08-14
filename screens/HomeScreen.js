import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.errorMessage) {
        console.log('Error:', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setAvatarUri(uri);  // Actualiza el estado con la nueva imagen
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
        </TouchableOpacity> */}
        <Text style={styles.greeting}>Hola, Juan!</Text>
        <Text style={styles.subGreeting}>¿Cómo estás el día de hoy?</Text>
        {/* <Image source={require('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x')} style={styles.avatar} /> */}
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      </View>

      <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('InfoScreen')}>
        <Image source={require('../assets/info-icon.png')} style={styles.infoIcon} />
        <Text style={styles.infoText}>APNEA QUE ES + INFO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sleepScoreBox} onPress={() => navigation.navigate('SleepScoreScreen')}>
        <Image source={require('../assets/sleep-icon.png')} style={styles.sleepIcon} />
        <Text style={styles.sleepScoreText}>PUNTUACION SUEÑO</Text>
      </TouchableOpacity>

      <View style={styles.mySpaceContainer}>
        <Text style={styles.mySpaceTitle}>Mi espacio</Text>
        <View style={styles.mySpaceOptions}>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('ContactsScreen')}>
            <Image source={require('../assets/contacts-icon.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Mis contactos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('CentersScreen')}>
            <Image source={require('../assets/centers-icon.png')} style={styles.mySpaceIcon} />
            <Text style={styles.mySpaceText}>Centros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mySpaceOption} onPress={() => navigation.navigate('MyDreamScreen')}>
            <Image source={require('../assets/dream-icon.png')} style={styles.mySpaceIcon} />
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
  backArrow: {
    width: 24,
    height: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#8E8E93',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  infoIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sleepScoreBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignItems: 'center',
  },
  sleepIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  sleepScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mySpaceContainer: {
    marginTop: 40,
  },
  mySpaceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
});

export default HomeScreen;
