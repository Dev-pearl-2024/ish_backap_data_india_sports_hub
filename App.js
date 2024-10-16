import React from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigators/StackNavigator';
import mobileAds from 'react-native-google-mobile-ads';


mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('AdMob initialized', adapterStatuses);
  });

export default function App() {
  return (
    <Provider store={store}>
    <StackNavigator />
    </Provider>
  );
}
