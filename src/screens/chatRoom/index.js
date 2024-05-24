import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ChatRoom from './chatRoom';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatRoomIndex = ({route}) => {
  const [token, setToken] = useState('');
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('userToken');
      setToken(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  // const socketIot = io('http://15.206.246.81:3000', {
  //   query: {
  //     token: token,
  //   },
  // });
  const socket = io('http://15.206.246.81:3000', {
    transports: ['websocket'],
    jsonp: false,
  });

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <View style={{flex: 1}}>
      <ChatRoom route={route} socketIo={socket} formatAMPM={formatAMPM} />
    </View>
  );
};

export default ChatRoomIndex;
