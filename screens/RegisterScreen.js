import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Picker } from 'react-native';
import axios from 'axios';

const RegistroScreen = ({navigation}) => {
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: 'YOUR_WEB_CLIENT_ID', // Reemplaza con tu client ID de OAuth 2.0
  //   });
  // }, []);

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //     // Aquí puedes redirigir al usuario a otra pantalla si el login es exitoso
  //     navigation.navigate('Profile'); // Navega a la pantalla Profile
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('Login cancelado');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('Login en progreso');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log('Servicios de Google Play no disponibles');
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    const fechaNacimiento = `${anio}-${mes}-${dia}`;

    if (!nombre || !apellido || !username || !email || !password || !anio || !mes || !dia || !genero || !altura || !peso) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/SomnoAI/crearUsuario/', {
        nombre,
        apellido,
        username,
        email,
        password,
        fecha_nacimiento: fechaNacimiento,
        genero,
        altura,
        peso,
        obra_social: obraSocial
      });
      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.error : 'Hubo un problema al crear el usuario.');
      navigation.navigate('Login')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={anio}
          style={styles.picker}
          onValueChange={(itemValue) => setAnio(itemValue)}
        >
          {years.map(year => (
            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
          ))}
        </Picker>
        <Picker
          selectedValue={mes}
          style={styles.picker}
          onValueChange={(itemValue) => setMes(itemValue)}
        >
          {months.map(month => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={dia}
          style={styles.picker}
          onValueChange={(itemValue) => setDia(itemValue)}
        >
          {days.map(day => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Género:</Text>
      <Picker
        selectedValue={genero}
        style={styles.picker}
        onValueChange={(itemValue) => setGenero(itemValue)}
      >
        <Picker.Item label="Selecciona tu género" value="" />
        <Picker.Item label="Masculino" value="M" />
        <Picker.Item label="Femenino" value="F" />
        <Picker.Item label="Otro" value="O" />
      </Picker>
      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        value={altura}
        onChangeText={setAltura}
        keyboardType='numeric'
      />
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        keyboardType='numeric'
      />
      <Text style={styles.label}>Obra Social:</Text>
      <TextInput
        style={styles.input}
        value={obraSocial}
        onChangeText={setObraSocial}
      />
      <Button title="Crear Usuario" onPress={handleSubmit} />
       <Text style={styles.texto}> 
        Ya tenés cuenta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesión</Text>
      </Text>
      {/* Parte coninua con Google */}
      <Text style={styles.texto}> 
        O continúa con
      </Text>
      {/* <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
          style={styles.googleIcon}
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default RegistroScreen;
