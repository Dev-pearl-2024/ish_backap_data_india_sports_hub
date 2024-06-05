import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const height = Dimensions.get('window').height;
const ChatRoom = ({roomId, sportData}) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('userToken');
      const res1 = await AsyncStorage.getItem('userId');
      setToken(res);
      setUserId(res1);
      console.log('token', res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    getCHats();
  }, []);
  const getCHats = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/chat/previous-data/${roomId}`,
      });
      setMessages(res?.data?.data?.threads);
      console.log('ress 0cagt', res.data.data.threads);
    } catch (e) {
      console.log(e, 'error in gechat');
    }
  };
  useEffect(() => {
    // Create socket connection
    console.log('Connecting to socket...');
    const newSocket = io('http://192.168.29.12:3000', {
      query: {
        token: token,
      },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);

      // Join room
      console.log('Joining room:', roomId);
      newSocket.emit('join room', {roomId: roomId, userId: userId});
    });

    newSocket.on('connect_error', err => {
      console.error('Connection error:', err);
    });

    newSocket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);
    });

    // Listen for incoming messages
    newSocket.on('message', msg => {
      console.log('New message received:', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
    });
    newSocket.on('join room', user => {
      console.log('User joined:', user);
      const joinMessage = {
        userId: 'system', // or any special identifier for system messages
        message: user?.user,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, joinMessage]);
    });
    // Set socket to state
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
    };
  }, [roomId, token, userId]);

  const sendMessage = () => {
    if (socket && message) {
      const msg = {
        roomName: roomId,
        message,
        userId,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, msg]);
      console.log('Sending message:', msg);
      socket.emit('message', msg);
      setMessage('');
    }
  };

  return (
    <ScrollView style={{padding: 20, backgroundColor: COLORS.white}}>
      
      <Text style={{color: COLORS.black, textAlign: 'center', fontWeight: 500}}>
        Chat Room: {sportData?.sport}
      </Text>
      <View
        style={{
          marginTop: 20,
          height: height - 200,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View>
          <ScrollView>
            {messages?.map((item, index) => {
              return (
                <>
                  <View
                    style={{
                      padding: 3,
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      backgroundColor:
                        item.userId === userId
                          ? COLORS.primary
                          : COLORS.table_gray,
                      borderRadius: 30,
                      maxWidth: '50%',
                      alignSelf:
                        item.userId === userId ? 'flex-end' : 'flex-start',
                    }}
                    key={index}>
                    <Text
                      style={{
                        textAlign: item.userId === userId ? 'right' : 'left',
                        color:
                          item.userId === userId ? COLORS.white : COLORS.black,

                        padding: 10,
                      }}>
                      {item?.message}
                    </Text>
                  </View>
                </>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 7,
                marginVertical: 10,
                width: '80%',
                borderRadius: 5,
                color: COLORS.black,
              }}
            />
            <TouchableOpacity
              title="Send"
              onPress={sendMessage}
              style={{
                width: '20%',
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontWeight: 500,
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatRoom;
