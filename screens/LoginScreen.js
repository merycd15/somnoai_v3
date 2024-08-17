import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 
  const handleLogin = async () => {
    if (!(username)) {
      setError('El username es obligatorio.');
      return;
    }
    if (!password) {
      setError('La contraseña es obligatoria.');
      return;
    }
  
    try {
      const response = await axios.post('https://somnoai.onrender.com/SomnoAI/Login/', {
        username,
        password
      });
  
      if (response.data.message === 'Inicio de sesión exitoso.') {
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        navigation.navigate('Home');
      } else {
        setError(response.data.error || 'Error en el inicio de sesión.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Hubo un problema con el inicio de sesión.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>SomnoAI</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Login</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Nombre de Usuario"
        keyboardType="name"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          placeholder="Contraseña"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.texto} onPress={() => navigation.navigate('RecoverPassword')}>
        ¿Olvidaste tu contraseña?
      </Text>
      <Text style={styles.texto} onPress={() => navigation.navigate('Register')}>
        ¿Deseas registrarte?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.textoGoogle}>
        O continúa con
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: '800',
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc', // Color del borde
    borderWidth: 2, // Grosor del borde
    borderRadius: 15, // Radio de los bordes
    paddingHorizontal: 15, // Espacio interno a los lados
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 4,
  },
  errorText: {
    color: 'red',
  },
  button: {
    width: '95%', // Ancho específico del botón
    height: 50, // Altura del botón
    borderRadius: 25, // Radio de los bordes
    backgroundColor: '#007BFF', // Color de fondo del botón
    alignItems: 'center', // Centra el texto en el botón
    justifyContent: 'center', // Centra el contenido verticalmente
    marginHorizontal: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  texto: {
    alignItems: 'left', // Centra el texto en el botón
    justifyContent: 'left', // Centra el contenido verticalmente
    color: 'blue', // Color del enlace
    padding: 10,
    paddingHorizontal: 15, // Espacio interno a los lados
  },
  textoGoogle:{
    alignItems: 'center', // Centra el texto en el botón
    justifyContent: 'center', // Centra el contenido verticalmente
    marginHorizontal: 'auto',
  }
});

export default LoginScreen;
