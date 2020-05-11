/**
 * @flow
 */

import * as React from 'react';
import {Button} from 'react-native';
import Colors from '../modules/Colors';

export default (props: React.ElementProps<Button>): React.Node => {
  const {style} = props;
  return <Button color={Colors.ACCENT} {...props} />;
};
