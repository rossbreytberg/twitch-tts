/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initialize as initializeChannelMessageListener} from './src/modules/ChannelMessageListener';
import {initialize as initializePersistentStateStorage} from './src/modules/PersistentStateStorage';

initializeChannelMessageListener();
initializePersistentStateStorage();

AppRegistry.registerComponent(appName, () => App);
