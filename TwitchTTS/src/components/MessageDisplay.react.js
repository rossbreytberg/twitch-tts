/**
 * @flow
 */

import type {Message} from '../redux/Reducer';

import * as React from 'react';
import {
  requireNativeComponent,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {messagesSelector, voiceAssignmentSelector} from '../redux/Selectors';

const TextToSpeech = requireNativeComponent('TextToSpeech');

export default (): React.Node => {
  const messages = useSelector(messagesSelector);
  const voiceAssignments = useSelector(voiceAssignmentSelector);
  const reversedMessages = Array.from(messages);
  reversedMessages.reverse();
  const reversedMessagesWithVoiceID = reversedMessages.map(message => ({
    ...message,
    voiceID: voiceAssignments[message.authorID] || null,
  }));
  if (messages.length === 0) {
    return (
      <View style={[styles.container, styles.placeholder]}>
        <Text>{'Chat messages will appear here.'}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={reversedMessagesWithVoiceID}
      inverted={true}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

function renderItem(data: {index: number, item: Message & {voiceID: ?string}}) {
  const {authorColor, authorName, content, id, timestamp, voiceID} = data.item;
  return (
    <View key={id} style={styles.message}>
      <View style={styles.authorTimeContainer}>
        <Text style={styles.time}>
          {new Date(timestamp).toLocaleTimeString([], {
            timeStyle: 'short',
          })}
        </Text>
        <Text style={[styles.author, {color: authorColor}]}>{authorName}</Text>
        <Text>{':'}</Text>
      </View>
      <Text>{content}</Text>
      <TextToSpeech text={content} voiceID={voiceID} />
    </View>
  );
}

const styles = StyleSheet.create({
  author: {
    fontWeight: 'bold',
  },
  authorTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 4,
  },
  container: {
    height: 150,
  },
  message: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    color: '#ccc',
    fontSize: 10,
    marginRight: 4,
  },
});
