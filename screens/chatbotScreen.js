import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ChatbotScreen = ({ route }) => {
  const { data: sleepData } = route.params; 
  const [messages, setMessages] = useState([
    { text: '¡Hola! ¿Cómo puedo ayudarte hoy?', from: 'bot' }
  ]);
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (input.trim() === '') return;

    // Agrega el mensaje del usuario
    setMessages([...messages, { text: input, from: 'user' }]);

    // Genera la respuesta del chatbot
    const response = generateResponse(input);
    
    setTimeout(() => {
      setMessages([...messages, { text: input, from: 'user' }, { text: response, from: 'bot' }]);
    }, 1000);

    setInput('');
  };

  const generateResponse = (input) => {
    input = input.toLowerCase();
    
    if (input.includes('cómo dormí') || input.includes('mi sueño')) {
      return `Tu puntuación de sueño fue de ${sleepData.sleepScore}, con un ${sleepData.apneaPercentage}% de apnea. Dormiste un total de ${sleepData.totalSleep} horas, de las cuales ${sleepData.deepSleep} horas fueron de sueño profundo.`;
    } else if (input.includes('qué es la apnea')) {
      return 'La apnea del sueño es un trastorno en el que la respiración se detiene brevemente durante el sueño debido a la obstrucción de las vías respiratorias.';
    } else if (input.includes('recomendaciones') || input.includes('mejorar mi sueño')) {
      return 'Aquí tienes algunas recomendaciones: 1) Mantén un horario de sueño regular. 2) Evita la cafeína y el alcohol antes de dormir. 3) Crea un ambiente propicio para el sueño.';
    } else {
      return 'Lo siento, no tengo una respuesta para eso. ¿Puedes preguntar de otra forma o sobre otro tema?';
    }
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
