import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MyDreamScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => acción para volver atrás}> */}
          {/* <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} /> */}
        {/* </TouchableOpacity> */}
        <Image source={require('../assets/contacts.png')} style={styles.icon} />
        <Text style={styles.title}>Mis Contactos</Text>
      </View>
      <View style={styles.infoBox}>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Contacto con el centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>9:00 am</Text>
          <Text style={styles.infoValue}>15/06/2024</Text>
        </View>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/miniCalendar.png')} style={styles.calendarIcon} />
        </View>
      </View>
      <View style={styles.infoBox}>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Contacto con el centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>9:00 am</Text>
          <Text style={styles.infoValue}>15/06/2024</Text>
        </View>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/miniCalendar.png')} style={styles.calendarIcon} />
        </View>
      </View>
      <View style={styles.infoBox}>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Contacto con el centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>9:00 am</Text>
          <Text style={styles.infoValue}>15/06/2024</Text>
        </View>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/miniCalendar.png')} style={styles.calendarIcon} />
        </View>
      </View>
      <View style={styles.infoBox}>
        {/* <Image source={require('../assets/miniCalendar.png')} style={styles.infoIcon} /> */}
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Contacto con el centro APNEA</Text>
          {/* El siguiente dato habría que tomarlo de algún lado */}
          <Text style={styles.infoValue}>9:00 am</Text>
          <Text style={styles.infoValue}>15/06/2024</Text>
        </View>
        <View style={styles.calendarIconContainer}>
          <Image source={require('../assets/miniCalendar.png')} style={styles.calendarIcon} />
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
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'thin',
    color: '#4A4A4A',
    marginTop: 5,
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
    alignSelf: 'flex-start', // Mueve el contenedor del ícono hacia la parte superior derecha
  },
  calendarIcon: {
    width: 25,
    height: 25,
  },
});

export default MyDreamScreen;
