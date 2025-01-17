import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../../../constants/Colors';
import WebViewWithSkeleton from '../../blog/webViewSkeletonLoader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ScoreWebView = ({ sportData,renderForPremium }) => {
  const [loading, setLoading] = useState(true);
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

  const onLoadStart = () => setLoading(true);
  const onLoadEnd = () => setLoading(false);

  return (
    <View>
       {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginVertical:10 }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <WebView 
        nestedScrollEnabled={true} 
        onLoadStart={onLoadStart} 
        onLoadEnd={onLoadEnd} 
        source={{ uri }} 
        // textZoom={70}
        style={{ flex: 1, height: height / 2, width: width,opacity: renderForPremium? 0.2 : 1 }} 
      />
    </View>
  );
};

export default ScoreWebView;
