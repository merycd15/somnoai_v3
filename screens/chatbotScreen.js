import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([{ text: '¡Hola! ¿Cómo puedo ayudarte hoy?', from: 'bot' }]);
  const [input, setInput] = useState('');
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    // Petición al backend para obtener los datos de apnea
    const fetchApneaData = async () => {
      try {
        const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/predecirApnea/');
        const data = response.data;

        // Guardar los datos y simular que el usuario los envía
        setBackendData(data);

        const userMessage = `
          Resultados del análisis:
          - Apnea: ${data.resultado_apnea}
          - Oxigenación: ${data.promedio_oxigeno}%, ${data.evaluacion_oxigeno}
          - Frecuencia cardíaca: ${data.promedio_heart_rate} bpm, ${data.evaluacion_heart_rate}
          - Respiración: ${data.promedio_breathing} respiraciones/min, ${data.evaluacion_breathing}
        `;

        // Agregar el mensaje del usuario
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: userMessage, from: 'user' }
        ]);

        // Enviar ese mensaje automáticamente al backend para que el bot lo responda
        const botResponse = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/geminiChat/', {
          question: userMessage,
          parametros: data,  // Pasar la info del backend
        });

        // Agregar la respuesta del bot
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: userMessage, from: 'user' },
          { text: botResponse.data.answer, from: 'bot' }
        ]);

      } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Hubo un error al obtener los datos de análisis.', from: 'bot' },
        ]);
      }
    };

    fetchApneaData();
  }, []);

  // Enviar mensaje al backend
  const handleSend = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, from: 'user' }]);

    try {
      const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/geminiChat/', {
        question: input,
        parametros: backendData,  // Pasar la info del backend
      });

      setMessages([...messages, { text: input, from: 'user' }, { text: response.data.answer, from: 'bot' }]);
    } catch (error) {
      console.error('Error al enviar el mensaje al backend:', error);
      setMessages([...messages, { text: input, from: 'user' }, { text: 'Hubo un error al procesar tu solicitud.', from: 'bot' }]);
    }

    setInput('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={true}>
        {messages.map((message, index) => (
          <View key={index} style={message.from === 'user' ? styles.userMessage : styles.botMessage}>
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
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-end', // Asegurar que los mensajes se apilen hacia abajo
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3E4A59',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
