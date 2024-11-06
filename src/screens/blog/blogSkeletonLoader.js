import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import BackHeader from '../../components/Header/BackHeader';

const SkeletonLoader = () => {
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
      <BackHeader />
      <View
        style={{
          position: 'relative',
        }}>
        <Animated.View
          style={[
            styles.skeletonImage,
            {
              backgroundColor: interpolateColor,
            },
          ]}
        />

        <View
          style={{
            padding: dynamicSize(10),
            position: 'absolute',
            borderRadius: dynamicSize(100),
            top: dynamicSize(10),
            right: dynamicSize(10),
            width: dynamicSize(40),
            height: dynamicSize(40),
            overflow: 'hidden',
          }}>
          <Animated.View
            style={[
              styles.skeletonButton,
              {
                backgroundColor: interpolateColor,
              },
            ]}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: dynamicSize(10),
            left: dynamicSize(10),
            flexDirection: 'row',
            alignItems: 'center',
            gap: dynamicSize(5),
          }}>
          <Animated.View
            style={[
              styles.skeletonMenu,
              {
                backgroundColor: interpolateColor,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonText,
              {
                backgroundColor: interpolateColor,
                width: dynamicSize(150),
                height: dynamicSize(20),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonImage: {
    width: '100%',
    height: dynamicSize(200),
    borderRadius: dynamicSize(10),
  },
  skeletonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dynamicSize(5),
    position: 'absolute',
    width: dynamicSize(40),
    height: dynamicSize(40),
    opacity: 0.5,
  },
  skeletonMenu: {
    width: dynamicSize(40),
    height: dynamicSize(40),
    borderRadius: dynamicSize(5),
  },
  skeletonText: {
    width: '70%',
    height: dynamicSize(20),
    borderRadius: dynamicSize(4),
  },
});

export default SkeletonLoader;
