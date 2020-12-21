/**
 * @flow
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistentStateSet} from '../redux/Actions';
import {persistentStateSelector} from '../redux/Selectors';
import Store from '../redux/Store';

const STORAGE_KEY = 'persistedState';

export async function initialize() {
  const persistedStateString = await AsyncStorage.getItem(STORAGE_KEY);
  if (persistedStateString != null) {
    Store.dispatch(persistentStateSet(JSON.parse(persistedStateString)));
  }
  Store.subscribe(onStoreUpdate);
}

function onStoreUpdate() {
  AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(persistentStateSelector(Store.getState())),
  );
}
