import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigators/StackNavigator';
import mobileAds from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

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
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
