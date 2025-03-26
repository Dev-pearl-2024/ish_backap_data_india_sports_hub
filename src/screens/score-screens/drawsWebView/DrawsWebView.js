import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import WebViewWithSkeleton from '../../blog/webViewSkeletonLoader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DrawsWebView = ({ renderForPremium,eventId,drawsURL }) => {
  const [uri, setUri] = useState(
    drawsURL ? drawsURL :
     `https://prod.d2c70r7y4ln6mc.amplifyapp.com/draws/${eventId}`
  );

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
