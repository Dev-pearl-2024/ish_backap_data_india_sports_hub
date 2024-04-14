import React from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import { Provider } from 'react-redux';

import StackNavigator from './src/navigators/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
    <StackNavigator />
    </Provider>
  );
}
