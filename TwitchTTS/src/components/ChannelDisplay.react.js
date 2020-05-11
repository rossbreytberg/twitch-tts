/**
 * @flow
 */

import * as React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Title} from './StyledText.react';
import {channelNameSelector} from '../redux/Selectors';

export default () => {
  const channelName = useSelector(channelNameSelector);
  return <Title>{channelName || 'No Channel Selected'}</Title>;
};
