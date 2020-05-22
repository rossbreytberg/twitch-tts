/**
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

export function Title(props: React.ElementProps<typeof Text>): React.Node {
  const {style} = props;
  return <Text {...props} style={[styles.title, style]} />;
}

export function Subtitle(props: React.ElementProps<typeof Text>): React.Node {
  const {style} = props;
  return <Text {...props} style={[styles.subtitle, style]} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    marginTop: 16,
  },
});
