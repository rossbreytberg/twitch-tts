/**
 * @flow
 */

import * as React from 'react';
import {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StyledButton from './StyledButton.react';
import StyledTextInput from './StyledTextInput.react';
import Colors from '../modules/Colors';
import {channelNameSet} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';

export default () => {
  const channelName = useSelector(channelNameSelector);
  const [value, setValue] = useState(channelName);
  const dispatch = useDispatch();
  const onSave = () => dispatch(channelNameSet(value));
  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={setValue}
        onSubmitEditing={onSave}
        placeholder="Enter Twitch Channel Name"
        style={styles.input}
        value={value}
      />
      <StyledButton onPress={onSave} title={'Save'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginRight: 12,
  },
});
