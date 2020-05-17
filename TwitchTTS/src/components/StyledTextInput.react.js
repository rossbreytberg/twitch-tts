/**
 * @flow
 */

import * as React from 'react';
import {forwardRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '../modules/Colors';

export default forwardRef<React.ElementProps<typeof TextInput>, TextInput>(
  (
    props: React.ElementProps<typeof TextInput>,
    ref: React.Ref<typeof TextInput>,
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
