import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [avatarUri, setAvatarUri] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    telephone: '',
    age: '',
    weight: '',
    height: '',
    medicalCare: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://proyectosomnoai.onrender.com/SomnoAI/getUsuarios/');
        setUserData(response.data);
        setAvatarUri(response.data.avatar || 'https://gravatar.com/avatar/...');
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setAvatarUri(response.assets[0].uri);
      }
    });
  };

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('https://proyectosomnoai.onrender.com/SomnoAI/actualizarDatos/user', { ...userData, avatar: avatarUri });
      Alert.alert('Éxito', 'Datos actualizados correctamente');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron actualizar los datos.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1b50a6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon} onPress={() => setIsEditing(!isEditing)}>
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.name}>{userData.name} {userData.surname}</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {['email', 'password', 'telephone', 'age', 'weight', 'height', 'medicalCare'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          value={userData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder={capitalize(field)}
          keyboardType={field === 'telephone' || field === 'age' || field === 'weight' || field === 'height'
            ? 'numeric' 
            : 'default'}
          secureTextEntry={field === 'password'}
          editable={isEditing}
        />
      ))}

      {isEditing && (
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar Datos</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#b3c0d6',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#1b50a6',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b50a6',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
