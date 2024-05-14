import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { text: "Aur Bhai, Kya haal hai?", sender: "Other User" },
    { text: "Sab badhiya!", sender: "You" },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: "You" }]);
      setInputText('');
    }
  };

  return (
    <View style={styles.chatRoom}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text>close</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
          <Image
          source={require('../../assets/images/archeryWorldCup.png')}
        />
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{message.sender}</Text>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {isTyping ? (
        <View style={styles.inputContainer}>
          {inputText.trim() !== '' && <Image
          source={require('../../assets/images/archeryWorldCup.png')}
        />}
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Subcribers mode only..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => setIsTyping(true)}>
            <Text style={styles.sendButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatRoom: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingTop: 30
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageBubble: {
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatRoom;
