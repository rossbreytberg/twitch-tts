/**
 * @flow
 */

import * as React from 'react';
import {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import StyledButton from './StyledButton.react';
import {wordFilterAdd} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';

export default (): React.Node => {
  const substitutionInput = useRef(null);
  const [word, setWord] = useState('');
  const [substitution, setSubstitution] = useState('');
  const dispatch = useDispatch();
  const onAdd = () => {
    dispatch(wordFilterAdd(word.trim(), substitution.trim()));
    setWord('');
    setSubstitution('');
  };
  const isSubmitDisabled = word == '' || word === substitution;
  return (
    <View style={styles.container}>
      <TextInput
        blurOnSubmit={true}
        onChangeText={setWord}
        onSubmitEditing={() => {
          substitutionInput.current && substitutionInput.current.focus();
        }}
        placeholder="Word"
        style={styles.wordInput}
        value={word}
      />
      <Text style={styles.arrow}>{'→'}</Text>
      <TextInput
        blurOnSubmit={true}
        onChangeText={setSubstitution}
        onSubmitEditing={!isSubmitDisabled ? onAdd : null}
        placeholder="Replacement"
        ref={substitutionInput}
        style={styles.substitutionInput}
        value={substitution}
      />
      <StyledButton disabled={isSubmitDisabled} onPress={onAdd} title="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    fontSize: 20,
    marginHorizontal: 12,
  },
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  substitutionInput: {
    flex: 1,
    marginRight: 12,
  },
  wordInput: {
    flex: 1,
  },
});
