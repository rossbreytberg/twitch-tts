/**
 * @flow
 */

import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeWordFilter} from '../redux/Actions';
import {wordFilterSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  const wordFilterMap = useSelector(wordFilterSelector);
  const wordSubstitutions = Object.keys(wordFilterMap).map(word => ({
    key: word,
    onRemove: () => dispatch(removeWordFilter(word)),
    substitution: wordFilterMap[word],
    word,
  }));
  if (wordSubstitutions.length === 0) {
    return null;
  }
  return (
    <FlatList
      containerStyle={styles.container}
      data={wordSubstitutions}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

function renderItem(data: {
  index: number,
  item: {onRemove: () => void, substitution: string, word: string},
}): React.Node {
  const {
    index,
    item: {onRemove, substitution, word},
  } = data;
  return (
    <TouchableHighlight onPress={onRemove}>
      <View style={styles.substitution}>
        <Text style={styles.old}>{word}</Text>
        <Text style={styles.arrow}>{'→'}</Text>
        <Text style={substitution ? styles.new : styles.old}>
          {substitution || '🗙'}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 20,
    marginHorizontal: 12,
  },
  container: {
    justifyContent: 'center',
  },
  list: {
    marginBottom: 4,
  },
  new: {
    color: '#98fa82',
    fontWeight: 'bold',
  },
  old: {
    color: '#fa8282',
    fontWeight: 'bold',
  },
  substitution: {
    alignItems: 'center',
    backgroundColor: '#111',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  substitutionContainer: {
    flexDirection: 'row',
  },
});
