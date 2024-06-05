import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ChatRoom from './chatRoom';
import BackHeader from '../../components/Header/BackHeader';
const ChatRoomIndex = ({route}) => {
  const {sportName} = route.params;
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
      <BackHeader />
      <ChatRoom
        route={route}
        roomId={sportName.tournamentId}
        sportData={sportName}
        formatAMPM={formatAMPM}
      />
    </View>
  );
};

export default ChatRoomIndex;
