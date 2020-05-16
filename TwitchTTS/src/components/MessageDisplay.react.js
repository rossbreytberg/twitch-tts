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
import {messagesSelector} from '../redux/Selectors';

const TextToSpeech = requireNativeComponent('TextToSpeech');

export default (): React.Node => {
  const messages = useSelector(messagesSelector);
  const reversedMessages = Array.from(messages);
  reversedMessages.reverse();
  return (
    <FlatList
      data={reversedMessages}
      inverted={true}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

function renderItem(data: {index: number, item: Message}) {
  const {author, authorColor, content, id, timestamp} = data.item;
  return (
    <View key={id} style={styles.message}>
      <View style={styles.authorTimeContainer}>
        <Text style={styles.time}>
          {new Date(timestamp).toLocaleTimeString([], {
            timeStyle: 'short',
          })}
        </Text>
        <Text style={[styles.author, {color: authorColor}]}>{author}</Text>
        <Text>{':'}</Text>
      </View>
      <Text>{content}</Text>
      <TextToSpeech text={content} />
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
    height: 300,
  },
  message: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  time: {
    color: '#ccc',
    fontSize: 10,
    marginRight: 4,
  },
});
