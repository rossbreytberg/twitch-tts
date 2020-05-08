/**
 * @flow
 */

import type {Message} from '../redux/Reducer';

import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {messagesSelector} from '../redux/Selectors';

export default () => {
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
  const {author, authorColor, content, id} = data.item;
  return (
    <View key={id} style={styles.message}>
      <Text style={[styles.author, {color: authorColor}]}>{author}</Text>
      <Text>{': ' + content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  author: {
    fontWeight: 'bold',
  },
  container: {
    height: '50%',
  },
  message: {
    flexDirection: 'row',
  },
});
