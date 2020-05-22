/**
 * @flow
 */

import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
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
    <>
      <View style={styles.header}>
        <ChannelDisplay />
        <SettingsVisibleToggle />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <MessageDisplay />
          {settingsVisible && (
            <View style={styles.settings}>
              <Title>{'Settings'}</Title>
              <Subtitle>{'Channel'}</Subtitle>
              <ChannelInput />
              <Subtitle>{'Voices'}</Subtitle>
              <VoiceSelector />
              <Subtitle>{'Word Filters'}</Subtitle>
              <WordFilterDisplay />
              <WordFilterInput />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
    paddingTop: 24,
  },
  header: {
    alignItems: 'center',
    backgroundColor: {
      windowsbrush: 'SystemControlBackgroundAltHighBrush',
    },
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
  settings: {
    marginTop: 12,
  },
});
