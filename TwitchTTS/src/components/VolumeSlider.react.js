/**
 * @flow
 */

import Slider from '@react-native-community/slider';
import * as React from 'react';
import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {volumeSet} from '../redux/Actions';
import {volumeSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  const volume = useSelector(volumeSelector);
  const onValueChange = useCallback(
    (newVolume) => dispatch(volumeSet(newVolume)),
    [dispatch, volumeSet],
  );
  return (
    <Slider
      minimumValue={0}
      maximumValue={100}
      onValueChange={onValueChange}
      value={volume}
      step={1}
      style={styles.slider}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 26,
    width: '100%',
  },
});
