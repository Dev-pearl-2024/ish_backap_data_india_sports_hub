import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import SendIcon from './sendIcon';
import { stringToDarkColor} from '../../constants/commonFunctions';
import PreLoader from '../../components/loader/fullLoader';

const height = Dimensions.get('window').height;

const ChatRoom = ({roomId, sportData}) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {
      setLoading(true);
      const res = await AsyncStorage.getItem('userToken');
      const res1 = await AsyncStorage.getItem('userId');
      setToken(res);
      setUserId(res1);
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
      setMessages(res?.data?.data[0]?.data || []);
      console.log(res?.data?.data[0]?.data, 'res in getchat');
    } catch (e) {
      console.log(e, 'error in gechat');
      setMessages([]);
    }
  };

  useEffect(() => {
    // Create socket connection
    console.log('Connecting to socket...');
    const newSocket = io('http://15.206.246.81:3000', {
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
      setMessages(prevMessages =>
        prevMessages ? [msg,...prevMessages ] : [msg],
      );
    });

    newSocket.on('join room', user => {
      console.log('User joined:', user);
      const joinMessage = {
        userId: 'system', // or any special identifier for system messages
        message: user?.user,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages =>
        prevMessages ? [joinMessage,...prevMessages ] : [joinMessage],
      );
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
      // Ensure the message is added to the existing array, or create a new array if it's empty
      setMessages(prevMessages =>
        prevMessages ? [msg,...prevMessages] : [msg],
      );
      console.log('Sending message:', msg);
      socket.emit('message', msg);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {loading ? <PreLoader />:
        <View style={{flex: 1, backgroundColor: COLORS.white, padding: 10}}>
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontWeight: '500',
            }}>
            Chat Room: {sportData?.sport}
          </Text>
          <View style={{flex: 1, marginTop: 20}}>
            <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform:'rotate(180deg)'
                  }}>
                  <Text>Start conversation by sending a message</Text>
                </View>
              )}
              renderItem={({item}) => (
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor:
                      item.userId === userId
                        ? COLORS.primary
                        : COLORS.table_gray,
                    borderRadius: 10,
                    maxWidth: '50%',
                    alignSelf:
                      item.userId === userId ? 'flex-end' : 'flex-start',
                    marginVertical: 5,
                  }}>
                  {(item.firstName || item?.username) && (
                    <Text
                      style={{
                        color:
                          item.userId === userId
                            ? COLORS.white
                            : stringToDarkColor(item?.firstName || item?.username) || COLORS.black,
                        textAlign: 'center',
                        fontWeight: '500',
                        display:
                      item.userId === userId ? 'none' : 'flex',
                      }}>
                      {item?.firstName || item?.username}{" "}{item?.lastName} 
                    </Text>
                  )}
                  <Text
                    style={{
                      textAlign: item.userId === userId ? 'right' : 'left',
                      color:
                        item.userId === userId ? COLORS.white : COLORS.black,
                        padding: 5,
                    }}>
                    {item?.message}
                  </Text>
                </View>
              )}
              contentContainerStyle={{paddingBottom: 20}}
              inverted
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 7,
                marginVertical: 10,
                flex: 1,
                borderRadius: 5,
                color: COLORS.black,
              }}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                width: 50,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 50,
              }}>
              <SendIcon color={COLORS.white} width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
