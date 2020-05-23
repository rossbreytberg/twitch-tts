/**
 * @flow
 */

import * as React from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  NativeModules,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {voiceEnabledSet, voiceOptionsSet} from '../redux/Actions';
import {voiceOptionsSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchVoiceOptions() {
      const voices = await NativeModules.TextToSpeech.getVoices();
      dispatch(voiceOptionsSet(voices));
    }
    fetchVoiceOptions();
  }, []);
  const voiceOptions = useSelector(voiceOptionsSelector);
  const voiceRowData = voiceOptions.map(voiceOption => {
    return {
      enabled: voiceOption.enabled,
      key: voiceOption.id,
      name: voiceOption.name,
      onToggle: (enabled: boolean) =>
        dispatch(voiceEnabledSet(voiceOption.id, enabled)),
      // Cannot disable voice if it is the only one enabled
      toggleDisabled:
        voiceOption.enabled &&
        voiceOptions.filter(voiceOption => voiceOption.enabled).length < 2,
    };
  });
  if (voiceRowData.length === 0) {
    return null;
  }
  return <FlatList data={voiceRowData} renderItem={renderItem} />;
};

function renderItem(data: {
  index: number,
  item: {
    enabled: boolean,
    name: string,
    onToggle: (enabled: boolean) => void,
    toggleDisabled: boolean,
  },
}): React.Node {
  const {
    index,
    item: {enabled, name, onToggle, toggleDisabled},
  } = data;
  return (
    <TouchableHighlight onPress={() => onToggle(!enabled)}>
      <View style={styles.voiceRow}>
        <Text>{name}</Text>
        <Switch
          disabled={toggleDisabled}
          onValueChange={onToggle}
          value={enabled}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  voiceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
