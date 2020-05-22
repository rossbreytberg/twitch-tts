/**
 * @flow
 */

import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Title} from './StyledText.react';
import {settingsVisibleSet} from '../redux/Actions';
import {settingsVisibleSelector} from '../redux/Selectors';

export default () => {
  const settingsVisible = useSelector(settingsVisibleSelector);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => dispatch(settingsVisibleSet(!settingsVisible))}
      style={settingsVisible ? styles.active : null}>
      <Text style={styles.gear}>{'⚙'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: {windowsbrush: 'SystemAccentColor'},
    borderRadius: 2,
  },
  gear: {
    fontSize: 18,
  },
});
