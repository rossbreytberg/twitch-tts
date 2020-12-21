/**
 * @flow
 */

import type {AudioOutputOption} from '../redux/Reducer';

import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
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
  const dispatch = useDispatch();
  let audioOutputOptions = useSelector(audioOutputOptionsSelector);
  audioOutputOptions = [getDefaultAudioOutputOption()].concat(
    audioOutputOptions,
  );
  const selectedID = useSelector(audioOutputSelectedIDSelector);
  return (
    <Picker
      selectedValue={selectedID || 'default'}
      onValueChange={(optionID) =>
        dispatch(
          audioOutputSelectedIDSet(optionID === 'default' ? null : optionID),
        )
      }>
      {audioOutputOptions.map((option) => (
        <Picker.Item key={option.id} label={option.name} value={option.id} />
      ))}
    </Picker>
  );
};

function getDefaultAudioOutputOption(): AudioOutputOption {
  return {
    id: 'default',
    name: 'Default',
  };
}
