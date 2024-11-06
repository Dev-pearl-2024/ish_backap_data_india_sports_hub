import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';


const NotificationHandler = () => {
  useEffect(() => {
    // Foreground notification handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New FCM message!', JSON.stringify(remoteMessage));
    });

    // Background notification handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);
};

export default NotificationHandler;
