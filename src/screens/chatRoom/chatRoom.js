import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatRoom = ({socketIo, formatAMPM}) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Join the room on component mount
    socketIo.emit('join room', 'room no. 23');

    // Listen for incoming messages
    socketIo.on('message', data => {
      insertChat('you', data.message);
    });

    // Clean up socket listeners on component unmount
    return () => {
      socketIo.off('message');
    };
  }, []);

  const insertChat = (who, text, time = 0) => {
    const date = formatAMPM(new Date());
    const newMessage = {
      who,
      text,
      date,
    };
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }, time);
  };

  const handleSend = () => {
    if (inputText !== '') {
      const message = {
        roomName: 'room no. 23',
        message: inputText,
        userId: Math.random(),
        timestamp: new Date(),
      };
      insertChat('me', inputText);
      socketIo.emit('message', message);
      setInputText('');
    }
  };

  //   const sendMessage = () => {
  //     if (inputText.trim() !== '') {
  //       setMessages([...messages, { text: inputText, sender: "You" }]);
  //       setInputText('');
  //     }
  //   };
  const handleReturnKeyPress = () => {
    if (Platform.OS === 'ios') {
      // For iOS, add a newline character
      setInputText(inputText + '\n');
    } else {
      // For Android, trigger send message function
      handleSend();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  return (
    <View style={styles.chatRoom}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
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
          {inputText.trim() !== '' && (
            <Image
              source={require('../../assets/images/archeryWorldCup.png')}
            />
          )}
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            multiline={true}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Enter') {
                handleReturnKeyPress();
              }
            }}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => setIsTyping(true)}>
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
    paddingTop: 30,
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
