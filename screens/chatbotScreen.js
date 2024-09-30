import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ChatbotScreen = ({ route }) => {
  const { data: sleepData } = route.params;
  const [messages, setMessages] = useState([
    { text: '¡Hola! ¿Cómo puedo ayudarte hoy?', from: 'bot' }
  ]);
  const [input, setInput] = useState('');

  // Modifica handleSend para enviar el mensaje al backend con Axios
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Agrega el mensaje del usuario a la pantalla
    setMessages([...messages, { text: input, from: 'user' }]);

    try {
      // Realiza una solicitud POST al backend con Axios
      const response = await axios.post('https://proyectosomnoai.onrender.com/SomnoAI/geminiChat/', {
        question: input,
        parametros: {
          oxigenacion: sleepData.oxigenacion || 98,
          ronquidos: sleepData.ronquidos || true,
        },
      });

      // Agrega la respuesta del bot a la pantalla
      setMessages([...messages, { text: input, from: 'user' }, { text: response.data.answer, from: 'bot' }]);
    } catch (error) {
      console.error('Error al enviar el mensaje al backend:', error);
      setMessages([...messages, { text: input, from: 'user' }, { text: 'Hubo un error al procesar tu solicitud.', from: 'bot' }]);
    }

    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={message.from === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',  // Color más oscuro
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: '#FFFFFF', // Texto en blanco para que sea legible sobre el fondo oscuro
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
