/**
 * @flow
 */

import * as React from 'react';
import {Button, PlatformColor} from 'react-native';

export default (props: React.ElementProps<typeof Button>): React.Node => (
  <Button color={PlatformColor('SystemAccentColor')} {...props} />
);
