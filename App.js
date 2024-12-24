import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigators/StackNavigator';
import mobileAds from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiCall from './src/utils/ApiCall';
import {check,PERMISSIONS,request} from "react-native-permissions"


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


mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // console.log('AdMob initialized', adapterStatuses);
  });

export default function App() {
  const postFCMToken = async () => {
    const userID = await AsyncStorage.getItem('userId');
    const token = await messaging().getToken();
    const deviceType = Platform.OS;
  
    let data = JSON.stringify({
      "deviceToken": token,
      "devicesType": deviceType,
      "fcmId": token
    });
      try {
        const response = await ApiCall({
          method: 'POST',
          endpoint:`users/add-device-and-fcm-id/${userID}`,
          payload: data
        });
        return response.data;
      } catch (error) {
        throw new Error('Failed to post fcm token');
      }
    };
  useEffect(() => {
    requestUserPermission();
    postFCMToken()
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
