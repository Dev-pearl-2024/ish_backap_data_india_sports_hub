import React from 'react';
import { View } from 'react-native';
import ChatRoom from './chatRoom';
import io from 'socket.io-client';

const ChatRoomIndex = () => {

  const socketIo = io("http://15.206.246.81:3000", {
    query: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ3NTFjZTdhNDA0NmQ1ZTllZmJmNTkiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzE1Njg4NjQ2LCJleHAiOjE3MTU3NzUwNDZ9.RrnWbHTaqkSbATL7D6VCkKy2ePA0D4COYIHV2sYRUig"
    }
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
    <View style={{ flex: 1 }}>
      <ChatRoom socketIo={socketIo}
      formatAMPM={formatAMPM} />
    </View>
  );
};

export default ChatRoomIndex;
