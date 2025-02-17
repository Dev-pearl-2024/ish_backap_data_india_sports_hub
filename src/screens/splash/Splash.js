import { StyleSheet, Text, View, Animated, Dimensions, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LogoIcon from '../../assets/icons/blue-logo.svg';
import COLORS from '../../constants/Colors';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

const Splash = () => {
  const auth = useSelector(state => state.auth)
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      handleNav();
    }, 1500);
  }, [isFocused]);

  const handleNav = async () => {
    // navigation.navigate('Login');
    // return
    try {
      const value = await AsyncStorage.getItem('userToken');
      const name = await AsyncStorage.getItem('firstName');
      if (!name) {
        await AsyncStorage.setItem("userId", "67ac65e9bd492b4aec20cb04")
      }
      // if (value !== null && name === null) {
      //   navigation.navigate('SignUp');
      // } else if (value !== null && name !== null) {
      //   navigation.navigate('Home');
      // } else if (value === null) {
      //   navigation.navigate('Login');
      //   // navigation.navigate('SignUp');
      // }
      navigation.navigate('Home');
    } catch (e) {
      console.log(e, 'error');
    }
  };
  return (
    <View>
      {isFocused && <StatusBar hidden={true} barStyle='default' animated={true} />}
      <DarkAnimation />
      <View
        style={{
          backgroundColor: 'transparent',
          borderRadius: 50, 
          height: height,
          width: width,
          position: 'absolute',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: 5,
            backgroundColor: COLORS.white,
            borderRadius: 50,
          }}>
          <LogoIcon />
        </View>
      </View>
    </View>
  );
};

export default Splash;

const DarkAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    startAnimation();
  }, [isFocused]);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 800, // Adjust the duration as needed
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800, // Adjust the duration as needed
        useNativeDriver: false,
      }),
    ]).start();
  };

  const movingDistance = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 0.8],
  });

  const borderRad = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, width * 2],
  });

  const movingDistance2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 0.8],
  });

  const borderRad2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [width, width * 2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateY: movingDistance }],
              borderBottomLeftRadius: borderRad,
              borderBottomRightRadius: borderRad,
              backgroundColor: '#e6f0f9',
              zIndex: 0,
              padding: 10,
              alignItems: 'center',
              width: width * 1.1
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateY: movingDistance2 }],
              borderBottomLeftRadius: borderRad2,
              borderBottomRightRadius: borderRad2,
              backgroundColor: '#cfe2f4',
              zIndex: 1,
              width: width,
              top: -20,
              position: 'absolute',
              // marginBottom: 10,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0166c224',
    backgroundColor: '#E6F0F9',
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: width,
    height: height,
    backgroundColor: '#CFE2F4',
  },
  lightCircle: {
    width: width,
    height: height,
    backgroundColor: '#E6F0F9',
  },
  lightContainer: {
    flex: 1,
    // backgroundColor: '#0166c224',
    backgroundColor: 'white',
  },
});
