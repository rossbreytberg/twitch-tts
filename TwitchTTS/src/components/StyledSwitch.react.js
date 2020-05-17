/**
 * @flow
 */

import * as React from 'react';
import {Switch} from 'react-native';
import Colors from '../modules/Colors';

export default (props: React.ElementProps<Switch>): React.Node => {
  return <Switch trackColor={{true: Colors.ACCENT}} {...props} />;
};
