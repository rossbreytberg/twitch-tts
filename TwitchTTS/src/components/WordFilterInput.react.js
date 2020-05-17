/**
 * @flow
 */

import * as React from 'react';
import {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import StyledButton from './StyledButton.react';
import StyledTextInput from './StyledTextInput.react';
import {addWordFilter} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';

export default (): React.Node => {
  const substitutionInput = useRef(null);
  const [word, setWord] = useState('');
  const [substitution, setSubstitution] = useState('');
  const dispatch = useDispatch();
  const onAdd = () => {
    dispatch(addWordFilter(word.trim(), substitution.trim()));
    setWord('');
    setSubstitution('');
  };
  const isSubmitDisabled = word == '' || word === substitution;
  return (
    <View style={styles.container}>
      <StyledTextInput
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
      <StyledTextInput
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
