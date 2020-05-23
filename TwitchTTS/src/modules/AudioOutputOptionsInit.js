/**
 * @flow
 */

import {NativeModules} from 'react-native';
import {
  audioOutputOptionsSet,
  audioOutputSelectedIDSet,
} from '../redux/Actions';
import {audioOutputSelectedIDSelector} from '../redux/Selectors';
import Store from '../redux/Store';

export async function initialize() {
  const audioOutputs = await NativeModules.TextToSpeech.getAudioOutputs();
  Store.dispatch(audioOutputOptionsSet(audioOutputs));
  // If the previously saved audio output selected ID is no longer a valid
  // audio output, reset it to default
  const selectedID = audioOutputSelectedIDSelector(Store.getState());
  if (
    selectedID !== null &&
    audioOutputs.filter(audioOutput => audioOutput.id === selectedID).length ===
      0
  ) {
    Store.dispatch(audioOutputSelectedIDSet(null));
  }
}
