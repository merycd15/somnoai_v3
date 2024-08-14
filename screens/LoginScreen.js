import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({navigation}) => {
  const [error, setError] = useState(''); 
  // const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // const [name, setName] = React.useState('');
  // const [surname, setSurname] = React.useState('');
  // const [telephone, setTelephone] = React.useState('');
  // const [age, setAge] = React.useState('');
  // const [weight, setWeight] = React.useState('');
  // const [height, setHeight] = React.useState('');
  // const [medicalCare, setMedicalCare] = React.useState('');  

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
    // if (!password || !name || !surname || !telephone || !age || !weight || !height || !medicalCare) {
    //   setError('Todos los campos deben estar llenos.');
    //   return;
    // }
    console.log('Datos válidos:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Alterna la visibilidad de la contraseña
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
    // const handleImagePicker = () => {
    //   const options = {
    //     mediaType: 'photo',
    //     quality: 1,
    //   };
    //   launchImageLibrary(options, response => {
    //     if (response.didCancel) {
    //       console.log('El usuario canceló la selección de imagen');
    //     } else if (response.errorMessage) {
    //       console.log('Error:', response.errorMessage);
    //     } else {
    //       const uri = response.assets[0].uri;
    //       setAvatarUri(uri);  // Actualiza el estado con la nueva imagen
    //     }
    //   });
    // };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>SomnoAI</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Registrate</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          placeholder="Contraseña"
          secureTextEntry={!isPasswordVisible} // Controla si el texto es seguro (oculto) o no
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon 
            name={isPasswordVisible ? "visibility" : "visibility-off"} 
            size={24} 
            color="grey" 
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.texto} onPress={() => navigation.navigate('RecoverPassword')}> 
        ¿Olvidaste tu contraseña?
      </Text>

      {/* <Button title="Enviar" onPress={validateInput} /> */}
      {/* <TouchableOpacity style={styles.button} onPress={validateInput}> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Parte coninua con Google */}
      <Text style={styles.textoGoogle}> 
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