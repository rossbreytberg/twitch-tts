/**
 * @flow
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import AppRoot from './src/components/AppRoot.react';
import Store from './src/redux/Store';

export default (): React.Node => {
  return (
    <Provider store={Store}>
      <SafeAreaView>
        <AppRoot />
      </SafeAreaView>
    </Provider>
  );
};
