import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigators/StackNavigator';
import mobileAds from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  } else {
    Alert.alert(
      'Notifications',
      'Permission to receive notifications was not granted.',
    );
  }
};



const getFCMToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  // Send this token to your server to associate it with the user
};

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('AdMob initialized', adapterStatuses);
  });

export default function App() {
  const postFCMToken = async () => {
    // console.log(userID, token, deviceType, 'response from fcm token api');
    const userID = await AsyncStorage.getItem('userId');
    const token = await messaging().getToken();
    const deviceType = Platform.OS;
  
    let data = JSON.stringify({
      "deviceToken": token,
      "devicesType": deviceType,
      "fcmId": token
    });
      try {
        const response = await axios({
          method: 'POST',
          url: `http://15.206.246.81:3000/users/add-device-and-fcm-id/${userID}`,
          data: data
        });
        console.log(response?.data, 'response from fcm token api');
        return response.data;
      } catch (error) {
        throw new Error('Failed to post fcm token');
      }
    };
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    postFCMToken()
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
