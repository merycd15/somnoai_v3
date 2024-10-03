import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display'; // Importar Markdown

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
            <Markdown style={styles.messageText}>{message.text}</Markdown> {/* Usar Markdown */}
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
    backgroundColor: '#4A90E2',  // Un tono azul claro
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3E4A59',  // Un tono azul gris oscuro
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: '#FFFFFF',  // Blanco para que sea legible sobre los fondos oscuros
    fontSize: 16,      // Ajustar el tamaño de letra para mayor legibilidad
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
    backgroundColor: '#4A90E2',  // Azul claro para el botón de enviar
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});


export default ChatbotScreen;
