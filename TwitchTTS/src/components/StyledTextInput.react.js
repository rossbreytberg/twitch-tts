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
    const {style} = props;
    const [focused, setFocused] = useState(false);
    return <TextInput {...props} ref={ref} style={[styles.input, style]} />;
  },
);

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.ACCENT,
    flexGrow: 1,
  },
});
