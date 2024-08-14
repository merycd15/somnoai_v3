import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [error, setError] = useState(''); 
  const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [medicalCare, setMedicalCare] = React.useState('');  

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
    };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View onPress={handleImagePicker}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <TouchableOpacity  style={styles.editIcon}>
            <Icon name="edit" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name} {surname}Lucas Scott</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      {/* <Button title="Enviar" onPress={validateInput} /> */}
      <TouchableOpacity style={styles.button} onPress={validateInput}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
});

export default ProfileScreen;