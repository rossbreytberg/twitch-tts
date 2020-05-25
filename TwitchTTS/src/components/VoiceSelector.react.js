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
import {voiceEnabledSet, voiceOptionsSet} from '../redux/Actions';
import {voiceOptionsSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  const voiceOptions = useSelector(voiceOptionsSelector);
  if (voiceOptions.length === 0) {
    return <Text>{'No voices available'}</Text>;
  }
  return (
    <View style={styles.container}>
      {voiceOptions.map(voiceOption => {
        const {enabled, id, name} = voiceOption;
        const onToggle = () => dispatch(voiceEnabledSet(id, !enabled));
        return (
          <View key={id} style={styles.voiceOption}>
            <TouchableOpacity onPress={onToggle}>
              <View style={styles.switchWithLabel}>
                <Switch
                  // Cannot disable voice if it is the only one enabled
                  disabled={
                    enabled &&
                    voiceOptions.filter(option => option.enabled).length < 2
                  }
                  onValueChange={onToggle}
                  value={enabled}
                />
                <Text>{name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
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
  voiceOption: {
    width: 200,
  },
});
