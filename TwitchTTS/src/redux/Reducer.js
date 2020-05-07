/**
 * @flow
 */

import type {
  SetChannelAction,
  AddWordFilterAction,
  RemoveWordFilterAction,
} from './Actions';

import {createReducer} from '@reduxjs/toolkit';
import {setChannelName, addWordFilter, removeWordFilter} from './Actions';

export type State = {
  channelName: string,
  wordFilter: {[word: string]: string},
};

const initialState: State = {
  channelName: '',
  wordFilter: {},
};

const Reducer = createReducer(initialState, {
  [setChannelName]: (state: State, action: SetChannelAction): void => {
    state.channelName = action.payload;
  },
  [addWordFilter]: (state: State, action: AddWordFilterAction): void => {
    state.wordFilter[action.payload.word] = action.payload.substitution;
  },
  [removeWordFilter]: (state: State, action: RemoveWordFilterAction): void => {
    delete state.wordFilter[action.payload];
  },
});

export default Reducer;
