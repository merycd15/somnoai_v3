import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView, Image, Picker,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegistroScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [anio, setAnio] = useState('2000');
  const [mes, setMes] = useState('01');
  const [dia, setDia] = useState('01');
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [obraSocial, setObraSocial] = useState('');
  const navigation = useNavigation();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const handleSubmit = async () => {
    const fechaNacimiento = `${anio}-${mes}-${dia}`;

    if (!nombre || !apellido || !username || !email || !password || !genero || !altura || !peso) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/crearUsuario/', {
        nombre, apellido, username, email, password,
        fecha_nacimiento: fechaNacimiento, genero, altura, peso, obra_social: obraSocial,
      });
      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.error : 'Hubo un problema al crear el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/LogoNombre.png')} style={styles.logo} />

      {/* Campos de Texto */}
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Fecha de Nacimiento */}
      <View style={styles.datePickerContainer}>
        <Picker selectedValue={anio} style={styles.picker} onValueChange={(item) => setAnio(item)}>
          {years.map((year) => <Picker.Item key={year} label={year.toString()} value={year.toString()} />)}
        </Picker>
        <Picker selectedValue={mes} style={styles.picker} onValueChange={(item) => setMes(item)}>
          {months.map((month) => <Picker.Item key={month} label={month} value={month} />)}
        </Picker>
        <Picker selectedValue={dia} style={styles.picker} onValueChange={(item) => setDia(item)}>
          {days.map((day) => <Picker.Item key={day} label={day} value={day} />)}
        </Picker>
      </View>

      {/* Selección de Género */}
      <Picker
        selectedValue={genero}
        style={styles.pickerFullWidth}
        onValueChange={(item) => setGenero(item)}
      >
        <Picker.Item label="Selecciona tu género" value="" />
        <Picker.Item label="Masculino" value="M" />
        <Picker.Item label="Femenino" value="F" />
        <Picker.Item label="Otro" value="O" />
      </Picker>

      {/* Campos de Altura y Peso */}
      <TextInput
        placeholder="Altura (cm)"
        style={styles.input}
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Peso (kg)"
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Obra Social (Opcional)"
        style={styles.input}
        value={obraSocial}
        onChangeText={setObraSocial}
      />

      {/* Botón de Registro */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>

      {/* Enlace a Login */}
      <Text style={styles.linkText}>
        ¿Ya tienes cuenta?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Inicia sesión
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#b3c0d6',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '85%',
    height: 45,
    backgroundColor: '#FFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 10,
  },
  picker: {
    width: '30%',
    height: 45,
    backgroundColor: '#FFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
  },
  pickerFullWidth: {
    width: '85%',
    height: 45,
    backgroundColor: '#FFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#345c9c',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    color: '#000',
  },
  link: {
    color: '#345c9c',
    fontWeight: 'bold',
  },
});

export default RegistroScreen;
