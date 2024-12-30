import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../../../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ScoreWebView = ({ sportData }) => {
  
  const [uri, setUri] = useState(
    `https://prod.d21b9k87xqy4ma.amplifyapp.com/score/${sportData.sport}/${sportData.category}/${sportData._id}`
  );

  const [loader, setLoader] = useState(true);
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
      {loader && <ActivityIndicator size={'small'} color={COLORS.primary} />}
      <WebView 
        nestedScrollEnabled={true} 
        source={{ uri }} 
        style={{ flex: 1, height: height / 2, width: width }} 
        onLoadStart={()=>setLoader(true)}
        // onLoadEnd={()=>setLoader(false)}
        onLoadEnd={()=>{
          setTimeout(() => {
            setLoader(false)
          }, 1200);
        }}
        
      >
        </WebView>
    
    </View>
  );
};

export default ScoreWebView;
