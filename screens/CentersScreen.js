import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyDreamScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => acción para volver atrás}> */}
          {/* <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} /> */}
        {/* </TouchableOpacity> */}
        <Image source={require('../assets/centers.png')} style={styles.icon} />
        <Text style={styles.title}>Centros</Text>
      </View>
      <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('FormScreen')}>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/provisorioMaps.png')} style={styles.calendarIcon} />
        </View>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>Dirección</Text>
          <Text style={styles.infoValue}>Horario</Text>
          <Text style={styles.infoValue}>Teléfono</Text>
          <Text style={styles.infoValueDif}>Mail</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/provisorioMaps.png')} style={styles.calendarIcon} />
        </View>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>Dirección</Text>
          <Text style={styles.infoValue}>Horario</Text>
          <Text style={styles.infoValue}>Teléfono</Text>
          <Text style={styles.infoValueDif}>Mail</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/provisorioMaps.png')} style={styles.calendarIcon} />
        </View>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>Dirección</Text>
          <Text style={styles.infoValue}>Horario</Text>
          <Text style={styles.infoValue}>Teléfono</Text>
          <Text style={styles.infoValueDif}>Mail</Text>
        </View>
      </View>


 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',          // Para organizar en fila
    alignItems: 'center',          // Centra verticalmente los elementos
    justifyContent: 'space-between', // Distribuye los elementos entre los extremos izquierdo y derecho
    paddingHorizontal: 20,         // Añade relleno a los lados
    marginTop: 20,                 // Añade un margen superio
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: '10%',                 // Mueve "Mi Sueño" más cerca de la imagen
  },
  icon: {
    width: 100,                      // Ajusta el tamaño de la imagen
    height: 100,                     // Ajusta el tamaño de la imagen
    alignSelf: 'center',
    marginVertical: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%', // Ancho deseado
    height: '15%', // Altura deseada
  },
  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    alignSelf:'flex-end',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'thin',
    color: '#4A4A4A',
    marginTop: 5,
    alignSelf:'flex-end',
  },
  infoValueDif: {
    fontSize: 15,
    fontWeight: 'thin',
    color: '#007AFF',
    marginTop: 5,
    alignSelf:'flex-end',
  },
  statsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  statsGraph: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bar: {
    width: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  calendarIconContainer: {
    // justifyContent: 'center', // Centra el icono verticalmente
    // alignItems: 'top',
    alignSelf: 'stretch', // Mueve el contenedor del ícono hacia la parte superior derecha
  },
  calendarIcon: {
    width: 150,
    height: 120,
  },
});

export default MyDreamScreen;
