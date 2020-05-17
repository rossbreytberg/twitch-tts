/**
 * @flow
 */

import type {
  AppStateSetAction,
  ChannelNameSetAction,
  MessageAddAction,
  VoiceEnabledSetAction,
  VoiceOptionsSetAction,
  WordFilterAddAction,
  WordFilterRemoveAction,
} from './Actions';

import {createReducer} from '@reduxjs/toolkit';
import {
  appStateSet,
  channelNameSet,
  messageAdd,
  voiceEnabledSet,
  voiceOptionsSet,
  wordFilterAdd,
  wordFilterRemove,
} from './Actions';

export type Message = {
  authorColor: string,
  authorID: string,
  authorName: string,
  content: string,
  id: string,
  timestamp: number,
};

export type VoiceOption = {|
  id: string,
  name: string,
|};

type VoiceOptionState = VoiceOption & {|
  enabled: boolean,
|};

export type State = {|
  channelName: string,
  messages: Array<Message>,
  voices: {
    assignments: {[userID: string]: string},
    options: Array<VoiceOptionState>,
  },
  wordFilter: {[word: string]: string},
|};

const initialState: State = {
  channelName: '',
  messages: [],
  voices: {
    assignments: {},
    options: [],
  },
  wordFilter: {},
};

const Reducer = createReducer(initialState, {
  [appStateSet]: (state: State, action: AppStateSetAction): State => {
    return action.payload;
  },
  [channelNameSet]: (state: State, action: ChannelNameSetAction): void => {
    state.channelName = action.payload;
  },
  [messageAdd]: (state: State, action: MessageAddAction): void => {
    // Assign a voice to the author if necessary
    const authorID = action.payload.authorID;
    let authorVoiceID = state.voices.assignments[authorID];
    const enabledVoiceIDs = state.voices.options
      .filter(voiceOption => voiceOption.enabled)
      .map(voiceOption => voiceOption.id);
    if (
      authorVoiceID === undefined ||
      !enabledVoiceIDs.includes(authorVoiceID)
    ) {
      const assignedVoiceIDs = {};
      Object.values(state.voices.assignments).forEach(voiceID => {
        if (typeof voiceID === 'string') {
          assignedVoiceIDs[voiceID] = true;
        }
      });
      const unassignedVoiceIDs = enabledVoiceIDs.filter(
        voiceID => assignedVoiceIDs[voiceID] === undefined,
      );
      state.voices.assignments[authorID] = getRandomArrayItem(
        unassignedVoiceIDs.length > 0 ? unassignedVoiceIDs : enabledVoiceIDs,
      );
    }
    // Then push the message to the message list
    state.messages.push(action.payload);
  },
  [voiceEnabledSet]: (state: State, action: VoiceEnabledSetAction): void => {
    state.voices.options = state.voices.options.map(voiceOption => {
      if (voiceOption.id === action.payload.id) {
        voiceOption.enabled = action.payload.enabled;
      }
      return voiceOption;
    });
  },
  [voiceOptionsSet]: (state: State, action: VoiceOptionsSetAction): void => {
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
  [wordFilterAdd]: (state: State, action: WordFilterAddAction): void => {
    state.wordFilter[action.payload.word] = action.payload.substitution;
  },
  [wordFilterRemove]: (state: State, action: WordFilterRemoveAction): void => {
    delete state.wordFilter[action.payload];
  },
});

function getRandomArrayItem(array: Array<T>): T {
  return array[Math.floor(array.length * Math.random())];
}

export default Reducer;
