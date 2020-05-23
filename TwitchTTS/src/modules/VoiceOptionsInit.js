/**
 * @flow
 */

import {NativeModules} from 'react-native';
import {voiceOptionsSet} from '../redux/Actions';
import Store from '../redux/Store';

export async function initialize() {
  const voices = await NativeModules.TextToSpeech.getVoices();
  Store.dispatch(voiceOptionsSet(voices));
}
