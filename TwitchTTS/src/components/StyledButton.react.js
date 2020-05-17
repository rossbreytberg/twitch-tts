/**
 * @flow
 */

import * as React from 'react';
import {Button} from 'react-native';
import Colors from '../modules/Colors';

export default (props: React.ElementProps<typeof Button>): React.Node => (
  <Button color={Colors.ACCENT} {...props} />
);
