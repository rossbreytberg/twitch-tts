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
import {Subtitle, Title} from './src/components/StyledText.react';
import WordFilterDisplay from './src/components/WordFilterDisplay.react';
import WordFilterInput from './src/components/WordFilterInput.react';
import Store from './src/redux/Store';

export default (): React.Node => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <ChannelDisplay />
          <Subtitle>{'Chat'}</Subtitle>
          <MessageDisplay />
          <Subtitle>{'Channel'}</Subtitle>
          <ChannelInput />
          <Subtitle>{'Word Filters'}</Subtitle>
          <WordFilterDisplay />
          <WordFilterInput />
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
