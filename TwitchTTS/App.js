/**
 * @flow
 */

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import ChannelDisplay from './src/components/ChannelDisplay.react';
import ChannelInput from './src/components/ChannelInput.react';
import MessageDisplay from './src/components/MessageDisplay.react';
import Store from './src/redux/Store';
import ChannelMessageListener from './src/modules/ChannelMessageListener';

export default () => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <MessageDisplay />
          <ChannelDisplay />
          <ChannelInput />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
