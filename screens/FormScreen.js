import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormScreen = ({navigation}) => {
  const [error, setError] = useState(''); 
  // const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // const [name, setName] = React.useState('');
  // const [surname, setSurname] = React.useState('');
  // const [telephone, setTelephone] = React.useState('');
  // const [age, setAge] = React.useState('');
  // const [weight, setWeight] = React.useState('');
  // const [height, setHeight] = React.useState('');
  // const [medicalCare, setMedicalCare] = React.useState('');  

//   const validateEmail = (email) => {
//     // Expresión regular para validar el formato del correo electrónico
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const validateInput = () => {
//     setError('');
//     if (!validateEmail(email)) {
//       setError('El correo electrónico no es válido.');
//       return;
//     }
//     // if (!password || !name || !surname || !telephone || !age || !weight || !height || !medicalCare) {
//     //   setError('Todos los campos deben estar llenos.');
//     //   return;
//     // }
//     console.log('Datos válidos:', { subject, message });
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible); // Alterna la visibilidad de la contraseña
//   };

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
            {/* <TouchableOpacity onPress={() => acción para volver atrás}> */}
            {/* <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} /> */}
            {/* </TouchableOpacity> */}
            <Image source={require('../assets/contacts.png')} style={styles.icon} />
            <Text style={styles.title}>Formulario contacto</Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setSubject}
                value={subject}
                placeholder="Asunto"
                keyboardType="email-address"
            />
            <View style={styles.messageContainer}>
            <TextInput
                style={styles.inputMessage}
                onChangeText={setMessage}
                value={message}
                placeholder="Mensaje"
                multiline={true}  // Permite múltiples líneas en el campo de texto
            />
            </View>

        </View>
      {/* <Text style={styles.texto} onPress={() => navigation.navigate('RecoverPassword')}> 
        ¿Olvidaste tu contraseña?
      </Text> */}

      {/* <Button title="Enviar" onPress={validateInput} /> */}
      {/* <TouchableOpacity style={styles.button} onPress={validateInput}> */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEnviar} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTextEnviar}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTextCancelar}>Cancelar</Text>
        </TouchableOpacity>
        </View>
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
  subtitle: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  input: {
    height: '10%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc', // Color del borde
    borderWidth: 2, // Grosor del borde
    borderRadius: 15, // Radio de los bordes
    paddingHorizontal: 15, // Espacio interno a los lados
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    // marginBottom: 0, // Aumenta la separación entre el campo de mensaje y los botones
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    height:'60%',
  },
  inputMessage: {
    flex: 1,
    // height: 100,  // Aumenta la altura del campo de mensaje
    fontSize: 16,
    textAlignVertical: 'top',  // Alinea el texto en la parte superior
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
  },
  buttonEnviar: {
    width: '40%', // Ajusta el ancho según tus necesidades
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelar: {
    width: '40%', // Ajusta el ancho según tus necesidades
    height: 50,
    borderRadius: 10,
    backgroundColor: '#828282',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextEnviar: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextCancelar: {
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

export default FormScreen;