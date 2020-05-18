/**
 * @flow
 */

import * as React from 'react';
import {Button} from 'react-native';

export default (props: React.ElementProps<typeof Button>): React.Node => (
  <Button color={{windowsbrush: 'SystemAccentColor'}} {...props} />
);
