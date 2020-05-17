/**
 * @flow
 */

import * as React from 'react';
import {Switch} from 'react-native';
import Colors from '../modules/Colors';

export default (props: React.ElementProps<typeof Switch>): React.Node => {
  return <Switch {...props} trackColor={{true: Colors.ACCENT}} />;
};
