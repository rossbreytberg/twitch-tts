/**
 * @flow
 */

import * as React from 'react';
import {useState} from 'react';
import {TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setChannelName} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';

export default () => {
  const channelName = useSelector(channelNameSelector);
  const [value, setValue] = useState(channelName);
  const dispatch = useDispatch();
  return (
    <View>
      <TextInput
        onChangeText={setValue}
        onSubmitEditing={() => dispatch(setChannelName(value))}
        placeholder="Enter Twitch Channel Name"
        value={value}
      />
    </View>
  );
};
