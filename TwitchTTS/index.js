/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initialize as initializeAudioOutputOptions} from './src/modules/AudioOutputOptionsInit';
import {initialize as initializeChannelMessageListener} from './src/modules/ChannelMessageListener';
import {initialize as initializePersistentStateStorage} from './src/modules/PersistentStateStorage';
import {initialize as initializeVoiceOptions} from './src/modules/VoiceOptionsInit';

async function initialize() {
  await initializePersistentStateStorage();
  await Promise.all([initializeAudioOutputOptions(), initializeVoiceOptions()]);
  await initializeChannelMessageListener();
}
initialize();

AppRegistry.registerComponent(appName, () => App);
