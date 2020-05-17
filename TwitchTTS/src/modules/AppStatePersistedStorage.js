/**
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';
import {appStateSet} from '../redux/Actions';
import Store from '../redux/Store';

type TwitchClient = {
  disconnect: () => Promise<void>,
};

const APP_STATE_STORAGE_KEY = 'appState';

export async function initialize() {
  const appStateString = await AsyncStorage.getItem(APP_STATE_STORAGE_KEY);
  if (appStateString != null) {
    Store.dispatch(appStateSet(JSON.parse(appStateString)));
  }
  Store.subscribe(onStoreUpdate);
}

function onStoreUpdate() {
  AsyncStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(Store.getState()));
}
