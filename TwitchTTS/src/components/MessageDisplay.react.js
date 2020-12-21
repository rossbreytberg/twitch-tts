/**
 * @flow
 */

import type {Message, WordFilter} from '../redux/Reducer';

import * as React from 'react';
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
  voiceAssignmentSelector,
  wordFilterSelector,
} from '../redux/Selectors';

const TextToSpeech = requireNativeComponent('TextToSpeech');

export default (): React.Node => {
  const dispatch = useDispatch();
  const audioOutputSelectedID = useSelector(audioOutputSelectedIDSelector);
  const messages = useSelector(messagesSelector);
  const voiceAssignments = useSelector(voiceAssignmentSelector);
  const wordFilter = useSelector(wordFilterSelector);
  let processedMessages = Array.from(messages);
  processedMessages.reverse();
  processedMessages = processedMessages.map((message) => ({
    ...message,
    audioOutputID: audioOutputSelectedID,
    filteredContent: getFilteredContent(message.content, wordFilter),
    messageReadSet: (read: boolean) =>
      dispatch(messageReadSet(message.id, read)),
    voiceID: voiceAssignments[message.authorID] || null,
  }));
  return (
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
  );
};

function getFilteredContent(content: string, wordFilter: WordFilter): string {
  let filteredContent = content;
  const wordsOrPatterns = Object.keys(wordFilter);
  for (let i = 0; i < wordsOrPatterns.length; i++) {
    const wordOrPattern = wordsOrPatterns[i];
    const substitution = wordFilter[wordOrPattern];
    const isPattern =
      wordOrPattern.slice(0, 1) === '/' && wordOrPattern.slice(-1) === '/';
    if (isPattern) {
      filteredContent = filteredContent.replace(
        new RegExp(wordOrPattern.slice(1, -1), 'g'),
        substitution,
      );
    } else {
      filteredContent = filteredContent
        .split(' ')
        .map((word) => (word === wordOrPattern ? substitution : word))
        .join(' ');
    }
  }
  return filteredContent;
}

function renderItem(data: {
  index: number,
  item: Message & {
    audioOutputID: ?string,
    filteredContent: string,
    messageReadSet: (read: boolean) => void,
    voiceID: ?string,
  },
}): React.Node {
  const {
    audioOutputID,
    authorColor,
    authorName,
    content,
    filteredContent,
    id,
    messageReadSet,
    read,
    timestamp,
    voiceID,
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
        onPress={() => messageReadSet(!read)}
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
        text={filteredContent}
        voiceID={voiceID}
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
