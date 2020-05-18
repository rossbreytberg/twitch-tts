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
import VoiceSelector from './src/components/VoiceSelector.react';
import WordFilterDisplay from './src/components/WordFilterDisplay.react';
import WordFilterInput from './src/components/WordFilterInput.react';
import Store from './src/redux/Store';

export default (): React.Node => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.title}>
          <ChannelDisplay />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Subtitle>{'Chat'}</Subtitle>
            <MessageDisplay />
            <Subtitle>{'Channel'}</Subtitle>
            <ChannelInput />
            <Subtitle>{'Voices'}</Subtitle>
            <VoiceSelector />
            <Subtitle>{'Word Filters'}</Subtitle>
            <WordFilterDisplay />
            <WordFilterInput />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    left: 0,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
