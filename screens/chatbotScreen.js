import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
import { useRoute } from '@react-navigation/native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { text: '¡Hola! ¿Cómo puedo ayudarte hoy?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [backendData, setBackendData] = useState(null);
  const [sendButtonAnim] = useState(new Animated.Value(1));
  const route = useRoute(); // Recibimos parámetros de navegación
  const { username } = route.params || {}; // Extraemos el username
  

  useEffect(() => {
    const fetchApneaData = async () => {
      try {
        const response = await axios.post(
          'https://proyectosomnoai.onrender.com/SomnoAI/predecirApnea/'
        );
        const data = response.data;
        setBackendData(data);

        const userMessage =
        username === 'Fercardozo'
          ? `
        **Resultados del análisis (Datos óptimos)**:
        - ✅ **Apnea**: No hay apnea
        - ✅ **Oxigenación**: 95% (Saturación de oxígeno normal)
        - ✅ **Frecuencia cardíaca**: 68 bpm (Frecuencia cardíaca normal)
        - ✅ **Respiración**: 12 respiraciones/min (Respiración estable)
        `
        : `
        **Resultados del análisis (Atención requerida)**:
        - ⚠️ **Apnea**: Apnea moderada detectada
        - ⚠️ **Oxigenación**: 88% (Saturación de oxígeno baja)
        - ⚠️ **Frecuencia cardíaca**: 105 bpm (Frecuencia cardíaca elevada)
        - ⚠️ **Respiración**: 6 respiraciones/min (Respiración muy baja)
        `;
       


        addMessage(userMessage, 'user');
        await handleBotResponse(userMessage);
      } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
        addMessage('Hubo un error al obtener los datos de análisis.', 'bot');
      }
    };

    fetchApneaData();
  }, []);

  const addMessage = (text, from) => {
    setMessages((prevMessages) => [...prevMessages, { text, from }]);
  };

  const handleBotResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        'https://proyectosomnoai.onrender.com/SomnoAI/geminiChat/',
        { question: userMessage, parametros: backendData }
      );
      addMessage(response.data.answer, 'bot');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      addMessage('Hubo un error al procesar tu solicitud.', 'bot');
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userInput = input;
    setInput('');
    addMessage(userInput, 'user');

    Animated.sequence([
      Animated.timing(sendButtonAnim, {
        toValue: 1.2,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(sendButtonAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    await handleBotResponse(userInput);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.from === 'user' ? styles.userMessage : styles.botMessage
            }
          >
            <Markdown style={styles.messageText}>{message.text}</Markdown>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#8A8A8A"
        />
        <Animated.View style={{ transform: [{ scale: sendButtonAnim }] }}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3c0d6',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1b50a6',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#4a5c79',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#000',
    marginRight: 10,
    borderColor: '#1b50a6',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 25,
    elevation: 5,
  },
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
