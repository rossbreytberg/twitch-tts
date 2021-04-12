/**
 * @flow
 */

import type {Message, WordFilter} from '../redux/Reducer';

import * as React from 'react';
import {useMemo} from 'react';
import {
  requireNativeComponent,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {messageReadSet} from '../redux/Actions';
import {
  audioOutputSelectedIDSelector,
  messagesSelector,
  pronounceNamesSelector,
  voiceAssignmentSelector,
  volumeSelector,
  wordFilterSelector,
} from '../redux/Selectors';

const TextToSpeech = requireNativeComponent('TextToSpeech');

export default (): React.Node => {
  const dispatch = useDispatch();
  const audioOutputSelectedID = useSelector(audioOutputSelectedIDSelector);
  const messages = useSelector(messagesSelector);
  const pronounceNames = useSelector(pronounceNamesSelector);
  const voiceAssignments = useSelector(voiceAssignmentSelector);
  const volume = useSelector(volumeSelector);
  const wordFilter = useSelector(wordFilterSelector);
  let processedMessages = Array.from(messages);
  processedMessages.reverse();
  processedMessages = processedMessages.map((message) => ({
    ...message,
    audioOutputID: audioOutputSelectedID,
    contentForAudio: getContentForAudio(message, pronounceNames, wordFilter),
    messageReadSet: (read: boolean) =>
      dispatch(messageReadSet(message.id, read)),
    voiceID: voiceAssignments[message.authorID] || null,
    volume,
  }));
  return useMemo(
    () => (
      <FlatList
        contentContainerStyle={styles.container}
        data={processedMessages}
        inverted={true}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.placeholder}>
            <Text>{'Chat messages will appear here'}</Text>
          </View>
        }
      />
    ),
    [serializeMessagesForMemo(messages)],
  );
};

function serializeMessagesForMemo(messages: Array<Message>): string {
  return messages
    .map((message) => message.id + (message.read ? 'r' : ''))
    .toString();
}

function getContentForAudio(
  message: Message,
  pronounceNames: boolean,
  wordFilter: WordFilter,
): string {
  let contentForAudio = message.content;
  const wordsOrPatterns = Object.keys(wordFilter);
  for (let i = 0; i < wordsOrPatterns.length; i++) {
    const wordOrPattern = wordsOrPatterns[i];
    const substitution = wordFilter[wordOrPattern];
    const isPattern =
      wordOrPattern.slice(0, 1) === '/' && wordOrPattern.slice(-1) === '/';
    if (isPattern) {
      try {
        contentForAudio = contentForAudio.replace(
          new RegExp(wordOrPattern.slice(1, -1), 'g'),
          substitution,
        );
      } catch (e) {
        // Skip invalid regexp
      }
    } else {
      contentForAudio = contentForAudio
        .split(' ')
        .map((word) => (word === wordOrPattern ? substitution : word))
        .join(' ');
    }
  }
  if (pronounceNames) {
    contentForAudio = message.authorName + ' said ' + contentForAudio;
  }
  return contentForAudio;
}

function renderItem(data: {
  index: number,
  item: Message & {
    audioOutputID: ?string,
    contentForAudio: string,
    messageReadSet: (read: boolean) => void,
    voiceID: ?string,
    volume: number,
  },
}): React.Node {
  const {
    audioOutputID,
    authorColor,
    authorName,
    content,
    contentForAudio,
    id,
    messageReadSet,
    read,
    timestamp,
    voiceID,
    volume,
  } = data.item;
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
      <TouchableOpacity
        disabled={read}
        onPress={() => messageReadSet(true)}
        style={styles.messageContentWrapper}>
        <Text
          style={[
            styles.messageContent,
            read === true && styles.messageContentRead,
          ]}>
          {content}
        </Text>
      </TouchableOpacity>
      <TextToSpeech
        audioOutputID={audioOutputID}
        onEnd={() => messageReadSet(true)}
        paused={read === true}
        text={contentForAudio}
        voiceID={voiceID}
        volume={Math.pow(volume, 2) / 10000} // Stretches out lower end of volume adjustment
      />
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
    flexGrow: 1,
    padding: 12,
  },
  message: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  messageContentRead: {
    opacity: 0.3,
  },
  messageContentWrapper: {
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  time: {
    color: '#ccc',
    fontSize: 10,
    marginRight: 4,
  },
});
