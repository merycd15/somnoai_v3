import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverPassScreen from '../screens/RecoverPassScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            title: 'Login',
            headerBackTitle: 'Back', // Título de la flecha de regreso
            headerBackVisible: false // Asegura que la flecha sea visible
          }}  // Opciones para la pantalla de inicio
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Home',
            headerBackTitle: 'Back', // Título de la flecha de regreso
            headerBackVisible: false // Asegura que la flecha sea visible
          }}  // Opciones para la pantalla de inicio
        />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassScreen}
          options={{
            title:'RecoverPassScreen',
            headerBackTitle: 'Back', // Título de la flecha de regreso
            headerBackVisible: false // Asegura que la flecha sea visible
          }}
         />
        <Stack.Screen name="Profile" component={ProfileScreen}   
          options={{ 
            title: 'Profile',
            headerBackTitle: 'Back', // Título de la flecha de regreso
            headerBackVisible: false // Asegura que la flecha sea visible
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} 
          options={{ 
            title: 'Register',
            headerBackTitle: 'Back', // Título de la flecha de regreso
            headerBackVisible: false // Asegura que la flecha sea visible
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
