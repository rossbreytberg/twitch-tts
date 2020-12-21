/**
 * @flow
 */

import * as React from 'react';
import {
  ImageBackground,
  PlatformColor,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AudioOutputSelector from './AudioOutputSelector.react';
import ChannelDisplay from './ChannelDisplay.react';
import ChannelInput from './ChannelInput.react';
import MessageDisplay from './MessageDisplay.react';
import SettingsVisibleToggle from './SettingsVisibleToggle.react';
import {Subtitle, Title} from './StyledText.react';
import VoiceSelector from './VoiceSelector.react';
import WordFilterDisplay from './WordFilterDisplay.react';
import WordFilterInput from './WordFilterInput.react';
import {settingsVisibleSelector} from '../redux/Selectors';

export default (): React.Node => {
  const settingsVisible = useSelector(settingsVisibleSelector);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.header}>
        <ChannelDisplay />
        <SettingsVisibleToggle />
      </ImageBackground>
      {settingsVisible ? (
        <ScrollView>
          <View style={[styles.messages, styles.messagesPartialHeight]}>
            <MessageDisplay />
          </View>
          <View style={styles.settings}>
            <Title>{'Settings'}</Title>
            <Subtitle>{'Channel'}</Subtitle>
            <ChannelInput />
            <Subtitle>{'Audio Output'}</Subtitle>
            <AudioOutputSelector />
            <Subtitle>{'Voices'}</Subtitle>
            <VoiceSelector />
            <Subtitle>{'Word Filters'}</Subtitle>
            <WordFilterDisplay />
            <WordFilterInput />
          </View>
        </ScrollView>
      ) : (
        <View style={[styles.messages, styles.messagesFullHeight]}>
          <MessageDisplay />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingBottom: 2,
    paddingHorizontal: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  messages: {
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  messagesFullHeight: {
    height: '100%',
  },
  messagesPartialHeight: {
    height: 200,
  },
  settings: {
    borderColor: PlatformColor('SystemControlForegroundChromeMediumBrush'),
    borderStyle: 'solid',
    borderTopWidth: 1,
    marginHorizontal: 12,
    paddingVertical: 12,
  },
});
