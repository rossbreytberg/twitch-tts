/**
 * @flow
 */

import * as React from 'react';
import {forwardRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '../modules/Colors';

export default forwardRef(
  (
    props: React.ElementProps<TextInput>,
    ref: React.Ref<TextInput>,
  ): React.Node => {
    const {onBlur, onFocus, style} = props;
    const [focused, setFocused] = useState(false);
    return (
      <TextInput
        {...props}
        onBlur={() => {
          setFocused(false);
          onBlur && onBlur();
        }}
        onFocus={() => {
          setFocused(true);
          onFocus && onFocus();
        }}
        ref={ref}
        style={[styles.input, focused && styles.focused, style]}
      />
    );
  },
);

const styles = StyleSheet.create({
  focused: {
    borderColor: Colors.ACCENT,
  },
  input: {
    borderColor: Colors.DISABLED,
    flexGrow: 1,
  },
});
