/**
 * @flow
 */

import {Picker} from '@react-native-community/picker';
import * as React from 'react';
import {useEffect} from 'react';
import {NativeModules} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  audioOutputOptionsSet,
  audioOutputSelectedIDSet,
} from '../redux/Actions';
import {
  audioOutputOptionsSelector,
  audioOutputSelectedIDSelector,
} from '../redux/Selectors';

export default (): React.Node => {
  const selectedID = useSelector(audioOutputSelectedIDSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchAudioOutputs() {
      const audioOutputs = await NativeModules.TextToSpeech.getAudioOutputs();
      dispatch(audioOutputOptionsSet(audioOutputs));
      // If the previously saved audio output selected ID is no longer a valid
      // audio output, reset it to default
      if (
        selectedID !== null &&
        audioOutputs.filter(audioOutput => audioOutput.id === selectedID)
          .length === 0
      ) {
        dispatch(audioOutputSelectedIDSet(null));
      }
    }
    fetchAudioOutputs();
  }, []);
  let audioOutputOptions = useSelector(audioOutputOptionsSelector);
  audioOutputOptions = [getDefaultAudioOutputOption()].concat(
    audioOutputOptions,
  );
  return (
    <Picker
      selectedValue={selectedID || 'default'}
      onValueChange={optionID =>
        dispatch(
          audioOutputSelectedIDSet(optionID === 'default' ? null : optionID),
        )
      }>
      {audioOutputOptions.map(option => (
        <Picker.Item key={option.id} label={option.name} value={option.id} />
      ))}
    </Picker>
  );
};

function getDefaultAudioOutputOption(): React.Node {
  return {
    id: 'default',
    name: 'Default',
  };
}
