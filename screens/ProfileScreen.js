import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [error, setError] = useState(''); 
  const [avatarUri, setAvatarUri] = useState('https://gravatar.com/avatar/efd37bb88aab610ee5741db63cbbc53c?s=400&d=robohash&r=x');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [medicalCare, setMedicalCare] = useState('');  
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  const validateEmail = (email) => {
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
        setAvatarUri(uri);
      }
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Cambia el estado de edición
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditToggle}>
              <Icon name="edit" size={14} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name} {surname}</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        keyboardType="default"
        secureTextEntry={true}
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nombre"
        keyboardType="default"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setSurname}
        value={surname}
        placeholder="Apellido"
        keyboardType="default"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setTelephone}
        value={telephone}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Edad"
        keyboardType="numeric"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        placeholder="Peso"
        keyboardType="decimal-pad"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        placeholder="Altura"
        keyboardType="decimal-pad"
        editable={isEditing} // Controla si es editable
      />
      <TextInput
        style={styles.input}
        onChangeText={setMedicalCare}
        value={medicalCare}
        placeholder="Obra social"
        keyboardType="default"
        editable={isEditing} // Controla si es editable
      />
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
    width: '95%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
