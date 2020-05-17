/**
 * @flow
 */

import type {
  AddMessageAction,
  AddWordFilterAction,
  RemoveWordFilterAction,
  SetChannelAction,
  SetVoiceEnabledAction,
  SetVoiceOptionsAction,
} from './Actions';

import {createReducer} from '@reduxjs/toolkit';
import {
  addMessage,
  addWordFilter,
  removeWordFilter,
  setChannelName,
  setVoiceEnabled,
  setVoiceOptions,
} from './Actions';

export type Message = {
  authorColor: string,
  authorID: string,
  authorName: string,
  content: string,
  id: string,
  timestamp: number,
};

export type VoiceOption = {
  id: string,
  name: string,
};

type VoiceOptionState = {
  ...VoiceOption,
  enabled: boolean,
};

export type State = {
  channelName: string,
  messages: Array<Message>,
  voices: {
    options: Array<VoiceOptionState>,
  },
  wordFilter: {[word: string]: string},
};

const initialState: State = {
  channelName: '',
  messages: [],
  voices: {
    options: [],
  },
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
  [setVoiceEnabled]: (state: State, action: SetVoiceEnabledAction): void => {
    state.voices.options = state.voices.options.map(voiceOption => {
      if (voiceOption.id === action.payload.id) {
        voiceOption.enabled = action.payload.enabled;
      }
      return voiceOption;
    });
  },
  [setVoiceOptions]: (state: State, action: SetVoiceOptionsAction): void => {
    // When setting voices, re-use their previous enabled state if there is one
    // Otherwise, voice start enabled by default
    const previousEnabledStateByID = {};
    state.voices.options.forEach(voiceOptionState => {
      previousEnabledStateByID[voiceOptionState.id] = voiceOptionState.enabled;
    });
    const voiceOptionsWithEnabledState = action.payload.map(voiceOption => {
      const previousEnabledState = previousEnabledStateByID[voiceOption.id];
      return {
        ...voiceOption,
        enabled:
          previousEnabledState !== undefined ? previousEnabledState : true,
      };
    });
    state.voices.options = voiceOptionsWithEnabledState;
  },
});

export default Reducer;
