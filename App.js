import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import StackNavigator from './src/navigators/StackNavigator';
import mobileAds from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform, StatusBar} from 'react-native';
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
    postFCMToken()
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


  const checkAndRequestNotificationPermission = async () => {
    try {
      const permissionStatus = await check(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.NOTIFICATIONS
      );
  
      if (permissionStatus === 'granted') {
        // Permission is already granted, do nothing
        console.log('Notification permission granted');
        return;
      }
  
      if (permissionStatus === 'denied') {
        // Permission is denied, do nothing
        console.log('Notification permission denied');
        return;
      }
  
      // If it's the first time (not granted or denied), ask for permission
      const newPermissionStatus = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.NOTIFICATIONS
      );
  
      if (newPermissionStatus === 'granted') {
        console.log('Notification permission granted');
      } else if (newPermissionStatus === 'blocked') {
        // Permission is blocked, navigate to settings
        Alert.alert(
          'Notification Permission',
          'Please enable notifications from settings.',
          [
            {
              text: 'Go to Settings',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  // Open iOS notification settings
                  Linking.openURL('app-settings:');
                } else {
                  // Open Android notification settings
                  Linking.openSettings();
                }
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.error('Error checking notification permissions', error);
    }
  };

  useEffect(() => {
    // Listen for foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    // Listen for background state notification clicks
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused the app to open from background state:', remoteMessage);
        // Handle the notification click here
        const { title, body } = remoteMessage.notification;
        console.log(`Notification Title: ${title}, Body: ${body}`);
        
        // Navigate or perform any desired action based on the notification
      }
    });
  
    // Cleanup both listeners
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
  
  


  const postFCMToken = async () => {
    const userID = await AsyncStorage.getItem('userId');
    const token = await messaging().getToken();
    const deviceType = Platform.OS;
    console.log('fcm token',token)
  
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
    // checkAndRequestNotificationPermission();

  }, []);

  // useEffect(() => {
    // checkAndRequestNotificationPermission();
  // }, []);

  return (
    <Provider store={store}>
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={'dark-content'}
        />
      <StackNavigator />
    </Provider>
  );
}
