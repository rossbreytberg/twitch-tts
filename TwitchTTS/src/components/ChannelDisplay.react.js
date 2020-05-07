/**
 * @flow
 */

import * as React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {channelNameSelector} from '../redux/Selectors';

export default () => {
  const channelName = useSelector(channelNameSelector);
  return (
    <View>
      <Text>{'Currently Listening To: ' + channelName}</Text>
    </View>
  );
};
