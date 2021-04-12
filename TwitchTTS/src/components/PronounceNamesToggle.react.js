/**
 * @flow
 */

import * as React from 'react';
import {
  FlatList,
  NativeModules,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {pronounceNamesSet} from '../redux/Actions';
import {pronounceNamesSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  const enabled = useSelector(pronounceNamesSelector);
  const onToggle = () => dispatch(pronounceNamesSet(!enabled));
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.switchWithLabel}>
          <Switch onValueChange={onToggle} value={enabled} />
          <Text>{'Pronounce Names'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switchWithLabel: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
