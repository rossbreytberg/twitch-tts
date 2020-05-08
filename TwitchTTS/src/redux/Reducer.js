/**
 * @flow
 */

import type {
  AddMessageAction,
  AddWordFilterAction,
  RemoveWordFilterAction,
  SetChannelAction,
} from './Actions';

import {createReducer} from '@reduxjs/toolkit';
import {
  addMessage,
  addWordFilter,
  removeWordFilter,
  setChannelName,
} from './Actions';

export type Message = {
  author: string,
  authorColor: string,
  content: string,
  id: string,
  timestamp: number,
};

export type State = {
  channelName: string,
  messages: Array<Message>,
  wordFilter: {[word: string]: string},
};

const initialState: State = {
  channelName: '',
  messages: [],
  wordFilter: {},
};

const Reducer = createReducer(initialState, {
  [addMessage]: (state: State, action: AddMessageAction): void => {
    state.messages.push(action.payload);
  },
  [addWordFilter]: (state: State, action: AddWordFilterAction): void => {
    state.wordFilter[action.payload.word] = action.payload.substitution;
  },
  [removeWordFilter]: (state: State, action: RemoveWordFilterAction): void => {
    delete state.wordFilter[action.payload];
  },
  [setChannelName]: (state: State, action: SetChannelAction): void => {
    state.channelName = action.payload;
  },
});

export default Reducer;
