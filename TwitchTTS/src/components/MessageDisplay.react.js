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
import {useDispatch, useSelector} from 'react-redux';
import {messageMarkRead} from '../redux/Actions';
import {
  audioOutputSelectedIDSelector,
  messagesSelector,
  voiceAssignmentSelector,
  wordFilterSelector,
} from '../redux/Selectors';

const TextToSpeech = requireNativeComponent('TextToSpeech');

export default (props: {
  style: $PropertyType<React.ElementProps<typeof View>, 'style'>,
}): React.Node => {
  const dispatch = useDispatch();
  const audioOutputSelectedID = useSelector(audioOutputSelectedIDSelector);
  const messages = useSelector(messagesSelector);
  const voiceAssignments = useSelector(voiceAssignmentSelector);
  const wordFilter = useSelector(wordFilterSelector);
  let processedMessages = Array.from(messages);
  processedMessages.reverse();
  processedMessages = processedMessages.map(message => ({
    ...message,
    audioOutputID: audioOutputSelectedID,
    filteredContent: message.content
      .split(' ')
      .map(word => (wordFilter[word] === undefined ? word : wordFilter[word]))
      .join(' '),
    markRead: () => dispatch(messageMarkRead(message.id)),
    voiceID: voiceAssignments[message.authorID] || null,
  }));
  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={processedMessages}
      inverted={true}
      renderItem={renderItem}
      ListEmptyComponent={
        <View style={styles.placeholder}>
          <Text>{'Chat messages will appear here.'}</Text>
        </View>
      }
    />
  );
};

function renderItem(data: {
  index: number,
  item: Message & {
    audioOutputID: ?string,
    filteredContent: string,
    markRead: () => void,
    voiceID: ?string,
  },
}) {
  const {
    audioOutputID,
    authorColor,
    authorName,
    content,
    filteredContent,
    id,
    markRead,
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
      <Text style={read === true && styles.messageContentRead}>{content}</Text>
      {read !== true && (
        <TextToSpeech
          audioOutputID={audioOutputID}
          onEnd={markRead}
          text={filteredContent}
          voiceID={voiceID}
        />
      )}
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
  content: {
    flexGrow: 1,
  },
  message: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  messageContentRead: {
    opacity: 0.3,
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
