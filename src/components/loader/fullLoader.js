import {View, Dimensions, Animated, StyleSheet} from 'react-native';
import LogoIcon from '../../assets/icons/blue-logo.svg';
import COLORS from '../../constants/Colors';
import {useEffect, useRef} from 'react';
const {width, height} = Dimensions.get('window');

export default function PreLoader() {
  return (
    <>
      <BlinkingAnimation />
    </>
  );
}

export const BlinkingAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.9,
          duration: 1000, // Adjust the duration of each phase as needed
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.4,
          duration: 1000, // Adjust the duration of each phase as needed
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  return (
    // <View style={styles.container}>
    <Animated.View
      style={[
        styles.box,
        {
          opacity: animatedOpacity,
        },
      ]}>
      <View
        style={{
          padding: 5,
          backgroundColor: COLORS.white,
          borderRadius: 50,
          position: 'absolute',
          top: height *0.3,
        }}>
        <LogoIcon />
      </View>
    </Animated.View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height,
    backgroundColor: COLORS.white,
    zIndex: 999,
  },
});
