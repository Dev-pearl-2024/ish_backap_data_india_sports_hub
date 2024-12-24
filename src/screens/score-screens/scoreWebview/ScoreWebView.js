import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ScoreWebView = ({ sportData }) => {
  const [uri, setUri] = useState(
    `https://prod.d21b9k87xqy4ma.amplifyapp.com/score/${sportData.sport}/${sportData.category}/${sportData._id}`
  );
  let count = 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUri(
        `https://prod.d21b9k87xqy4ma.amplifyapp.com/score/${sportData.sport}/${sportData.category}/${sportData._id}?count=${count}`
      );
      count++

    }, 60000); 

    return () => clearInterval(intervalId);
  }, [sportData])


  return (
    <View>
      <WebView 
        nestedScrollEnabled={true} 
        source={{ uri }} 
        style={{ flex: 1, height: height / 2, width: width }} 
      />
    </View>
  );
};

export default ScoreWebView;
