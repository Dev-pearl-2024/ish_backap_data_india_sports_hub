/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {withIAPContext} from 'react-native-iap';

AppRegistry.registerComponent(appName, () => withIAPContext(App));
