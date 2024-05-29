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
import COLORS from '../../constants/Colors';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatRoom = ({route, socketIo, formatAMPM}) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const {sportName} = route.params;
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('userToken');
      const res1 = await AsyncStorage.getItem('userId');
      setToken(res);
      setUserId(res1);
      console.log('token', sportName);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  // useEffect(() => {
  //   const socket = io('http://15.206.246.81:3000', {
  //     query: {
  //       token: token,
  //     },
  //   });

  //   socket.on('connect', () => {
  //     console.log('Connected to the server');
  //     const messageData = {
  //       roomName: sportName?._id,
  //       userId: userId,
  //       timestamp: moment().format('DD/MM/YY'),
  //     };

  //     // Send the message to the server
  //     socket.emit('messageEvent', messageData);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //   });

  //   // Add other event listeners as needed
  //   socket.on('someEvent', data => {
  //     console.log('Data received:', data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [token, userId]);
  useEffect(() => {
    const newSocket = io('http://15.206.246.81:3000', {
      query: {
        token: token,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token, userId]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to the server');
        // const messageData = {
        //   roomName: sportName,
        //   userId: userId,
        //   timestamp: new Date().toLocaleString(),
        // };
        // socket.emit('messageEvent', messageData);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
      });

      socket.on('someEvent', data => {
        console.log('Data received:', data);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket && inputText !== '') {
      console.log('Sending message:', inputText); // Log before emitting the message
      const messageData = {
        roomName: sportName,
        message: inputText,
        userId: userId,
        timestamp: new Date().toLocaleString(),
      };
      console.log('messageData', messageData);
      socket.emit('message', messageData, ack => {
        console.log('Message sent successfully:', ack); // Log after emitting the message
      });
      console.log('messageData after emit', messageData);
      // socket.emit('sendMessage', messageData);
    }
  };
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
    // if (inputText !== '') {
    const message = {
      roomName: sportName,
      message: inputText,
      userId: Math.random(),
      timestamp: new Date(),
    };
    sendMessage();
    insertChat('me', inputText);
    // sendMessage('message', message);
    setInputText('');
    // }
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
        <Text style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 500}}>
          close
        </Text>
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
    color: COLORS.black,
  },
  messageBubble: {
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 8,
  },
  messageText: {
    fontSize: 16,
    color: COLORS.black,
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
    color: COLORS.black,
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
