import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const WebViewWithSkeleton = () => {
  const skeletonAnimation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(skeletonAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const interpolateColor = skeletonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#BDBDBD'],
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.skeletonContainer}>
        <Animated.View
          style={[
            styles.skeletonWebView,
            {
              backgroundColor: interpolateColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dynamicSize(20),
  },
  skeletonWebView: {
    width: '100%',
    height: dynamicSize(200),
    borderRadius: dynamicSize(10),
  },
  webView: {
    flex: 1,
  },
});

export default WebViewWithSkeleton;
