
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

const NewNotificationHandler = () => {
  useEffect(() => {
    // Request notification permission (for iOS)
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'ios') {
        try {
          const authStatus = await messaging().requestPermission();
          const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        } catch (error) {
          console.error('Notification permission request failed:', error);
        }
      }
    };

    // Request permission on app startup
    requestNotificationPermission();

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

  // Function to get FCM token
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        return token;
      } else {
        console.log('No FCM token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  };

  return {
    getFcmToken,
  };
};

export default NewNotificationHandler;