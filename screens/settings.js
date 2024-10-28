import React, { useState } from 'react';
import {
  View, Text, Switch, StyleSheet, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation();

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      {/* Modo Oscuro */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#345c9c' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Notificaciones */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={notificationsEnabled ? '#345c9c' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Navegar a Perfil */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.optionText}>Editar Perfil</Text>
        <Image
          source={require('../assets/LogoSolo.png')}
          style={styles.optionIcon}
        />
      </TouchableOpacity>

      {/* Enlace a Políticas de Privacidad */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => alert('Políticas de Privacidad')}
      >
        <Text style={styles.optionText}>Políticas de Privacidad</Text>
      </TouchableOpacity>

      {/* About us */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => alert('About us')}
      >
        <Text style={styles.optionText}>About us</Text>
      </TouchableOpacity>

      {/* Cerrar Sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#b3c0d6',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#345c9c',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  optionIcon: {
    width: 30,
    height: 30,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
