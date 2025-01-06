import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DrawsWebView = ({ renderForPremium,eventId }) => {
  const [uri, setUri] = useState(
    `https://prod.d21b9k87xqy4ma.amplifyapp.com/draws/${eventId}`
  );
  let count = 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUri(
        `https://prod.d21b9k87xqy4ma.amplifyapp.com/draws/${eventId}?count=${count}`
      );
      count++

    }, 60000); 

    return () => clearInterval(intervalId);
  }, [eventId])

console.log("URI",uri)
  return (
    <View>
      <WebView 
        nestedScrollEnabled={true} 
        source={{ uri }} 
        // textZoom={70}
        style={{ flex: 1, height: height / 2, width: width,opacity: renderForPremium? 0.2 : 1 }} 
      />
    </View>
  );
};

export default DrawsWebView;
