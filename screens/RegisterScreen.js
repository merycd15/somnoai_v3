import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import ProfileScreen from './ProfileScreen';

const RegisterScreen = ({navigation}) => {
  const [error, setError] = useState(''); 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [medicalCare, setMedicalCare] = React.useState('');  

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

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateInput = () => {
    setError('');
    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }
    if (!password || !name || !surname || !telephone || !age || !weight || !height || !medicalCare) {
      setError('Todos los campos deben estar llenos.');
      return;
    }
    console.log('Datos válidos:', { email, password, name, surname, telephone, age, weight, height, medicalCare });
  };

    // // useEffect para cargar los datos al montar el componente
    // useEffect(() => {
    //   // Simulando una llamada a una API
    //   fetch('https://miapi.com/perfil')  // URL de tu API
    //     .then(response => response.json())
    //     .then(data => {
    //       setEmail(data.email);
    //       setPassword(data.password); // Evita hacer esto en producción
    //       setName(data.name);
    //       setSurname(data.surname);
    //       setTelephone(data.telephone);
    //       setAge(data.age);
    //       setWeight(data.weight);
    //       setHeight(data.height);
    //       setMedicalCare(data.medicalCare);
    //       setAvatarUri(data.avatarUri); // Supongamos que la API también devuelve la URL de la imagen
    //     })
    //     .catch(error => {
    //       console.error('Error al obtener los datos del perfil:', error);
    //     });
    // }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>SomnoAI</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Registrate</Text>
      </View>
      {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        keyboardType="default"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nombre"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSurname}
        value={surname}
        placeholder="Apellido"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTelephone}
        value={telephone}
        placeholder="Teléfono"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Edad"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        placeholder="Peso"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        placeholder="Altura"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMedicalCare}
        value={medicalCare}
        placeholder="Obra social"
        keyboardType="default"
      />
      {/* <Button style={styles.button} title="Registrarse" onPress={validateInput} /> */}
      <TouchableOpacity style={styles.button} onPress={validateInput}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.texto}> 
        Ya tenés cuenta? <Text style={styles.link} onPress={() => navigation.navigate('Profile')}>Inicia sesión</Text>
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 4,
  },
  errorText: {
    marginLeft: 10,
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
    alignItems: 'center', // Centra el texto en el botón
    justifyContent: 'center', // Centra el contenido verticalmente
    marginHorizontal: 'auto',
  },
  link: {
    color: 'blue', // Color del enlace
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4B3B',
    borderRadius: 50, // Redondeado completo para un círculo
    width: 60, // Ancho del botón
    height: 60, // Altura del botón
    marginVertical: 10,
  },
  googleIcon: {
    width: 30, // Ancho del ícono
    height: 30, // Altura del ícono
  },
});

export default RegisterScreen;