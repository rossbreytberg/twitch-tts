/**
 * @flow
 */

import * as React from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  NativeModules,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StyledSwitch from './StyledSwitch.react';
import {setVoiceEnabled, setVoiceOptions} from '../redux/Actions';
import {voiceOptionsSelector} from '../redux/Selectors';

export default (): React.Node => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchVoiceOptions() {
      const voices = await NativeModules.SpeechSynthesizerVoices.getAllVoices();
      dispatch(setVoiceOptions(voices));
    }
    fetchVoiceOptions();
  }, []);
  const voiceOptions = useSelector(voiceOptionsSelector).map(voiceOption => {
    return {
      enabled: voiceOption.enabled,
      key: voiceOption.id,
      name: voiceOption.name,
      onToggle: (enabled: boolean) =>
        dispatch(setVoiceEnabled(voiceOption.id, enabled)),
    };
  });
  if (voiceOptions.length === 0) {
    return null;
  }
  return <FlatList data={voiceOptions} renderItem={renderItem} />;
};

function renderItem(data: {
  index: number,
  item: {
    enabled: boolean,
    name: string,
    onToggle: (enabled: boolean) => void,
  },
}): React.Node {
  const {
    index,
    item: {enabled, name, onToggle},
  } = data;
  return (
    <TouchableHighlight onPress={() => onToggle(!enabled)}>
      <View style={styles.voiceRow}>
        <Text>{name}</Text>
        <StyledSwitch onValueChange={onToggle} value={enabled} />
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
