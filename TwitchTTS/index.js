/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initialize as initializeChannelMessageListener} from './src/modules/ChannelMessageListener';

initializeChannelMessageListener();

AppRegistry.registerComponent(appName, () => App);
