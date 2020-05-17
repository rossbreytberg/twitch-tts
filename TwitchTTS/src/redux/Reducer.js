/**
 * @flow
 */

import type {
  ChannelNameSetAction,
  MessageAddAction,
  PersistentStateSetAction,
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
  persistentStateSet,
  voiceEnabledSet,
  voiceOptionsSet,
  wordFilterAdd,
  wordFilterRemove,
} from './Actions';

export type Message = {|
  authorColor: string,
  authorID: string,
  authorName: string,
  content: string,
  id: string,
  timestamp: number,
|};

export type VoiceOption = {|
  id: string,
  name: string,
|};

// State that will persist across app restarts
export type PersistentState = {|
  channelName: string,
  wordFilter: {[word: string]: string},
|};

export type State = {|
  messages: Array<Message>,
  persistent: PersistentState,
  voices: {|
    assignments: {[userID: string]: string},
    options: VoiceOption & {|
      enabled: boolean,
    |},
  |},
|};

const initialState: State = {
  messages: [],
  persistent: {
    channelName: '',
    wordFilter: {},
  },
  voices: {
    assignments: {},
    options: [],
  },
};

const Reducer = createReducer(initialState, {
  [channelNameSet]: (state: State, action: ChannelNameSetAction): void => {
    state.persistent.channelName = action.payload;
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
  [persistentStateSet]: (
    state: State,
    action: PersistentStateSetAction,
  ): void => {
    state.persistent = action.payload;
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
    state.persistent.wordFilter[action.payload.word] =
      action.payload.substitution;
  },
  [wordFilterRemove]: (state: State, action: WordFilterRemoveAction): void => {
    delete state.persistent.wordFilter[action.payload];
  },
});

function getRandomArrayItem(array: Array<T>): T {
  return array[Math.floor(array.length * Math.random())];
}

export default Reducer;
