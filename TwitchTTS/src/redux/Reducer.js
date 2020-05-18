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
  voiceOptions: Array<
    VoiceOption & {|
      enabled: boolean,
    |},
  >,
  wordFilter: {[word: string]: string},
|};

export type State = {|
  messages: Array<Message>,
  persistent: PersistentState,
  voiceAssignments: {[userID: string]: string},
|};

const initialState: State = {
  messages: [],
  persistent: {
    channelName: '',
    voiceOptions: [],
    wordFilter: {},
  },
  voiceAssignments: {},
};

const MAX_MESSAGE_COUNT: number = 10;

const Reducer = createReducer(initialState, {
  [channelNameSet]: (state: State, action: ChannelNameSetAction): void => {
    state.persistent.channelName = action.payload;
  },
  [messageAdd]: (state: State, action: MessageAddAction): void => {
    // Assign a voice to the author if necessary
    const authorID = action.payload.authorID;
    let authorVoiceID = state.voiceAssignments[authorID];
    const enabledVoiceIDs = state.persistent.voiceOptions
      .filter(voiceOption => voiceOption.enabled)
      .map(voiceOption => voiceOption.id);
    if (
      authorVoiceID === undefined ||
      !enabledVoiceIDs.includes(authorVoiceID)
    ) {
      const assignedVoiceIDs = {};
      Object.values(state.voiceAssignments).forEach(voiceID => {
        if (typeof voiceID === 'string') {
          assignedVoiceIDs[voiceID] = true;
        }
      });
      const unassignedVoiceIDs = enabledVoiceIDs.filter(
        voiceID => assignedVoiceIDs[voiceID] === undefined,
      );
      state.voiceAssignments[authorID] = getRandomArrayItem(
        unassignedVoiceIDs.length > 0 ? unassignedVoiceIDs : enabledVoiceIDs,
      );
    }
    // Then push the message to the message list
    state.messages.push(action.payload);
    // Drop old messages if we have too many
    state.messages = state.messages.slice(
      Math.max(state.messages.length - MAX_MESSAGE_COUNT, 0),
    );
  },
  [persistentStateSet]: (
    state: State,
    action: PersistentStateSetAction,
  ): void => {
    state.persistent = action.payload;
  },
  [voiceEnabledSet]: (state: State, action: VoiceEnabledSetAction): void => {
    state.persistent.voiceOptions = state.persistent.voiceOptions.map(
      voiceOption => {
        if (voiceOption.id === action.payload.id) {
          voiceOption.enabled = action.payload.enabled;
        }
        return voiceOption;
      },
    );
  },
  [voiceOptionsSet]: (state: State, action: VoiceOptionsSetAction): void => {
    // When setting voices, re-use their previous enabled state if there is one
    // Otherwise, voice start enabled by default
    const previousEnabledStateByID: {[id: string]: ?boolean} = {};
    state.persistent.voiceOptions.forEach(voiceOptionState => {
      previousEnabledStateByID[voiceOptionState.id] = voiceOptionState.enabled;
    });
    const voiceOptionsWithEnabledState = action.payload.map(voiceOption => {
      const previousEnabledState = previousEnabledStateByID[voiceOption.id];
      return {
        ...voiceOption,
        enabled: previousEnabledState != null ? previousEnabledState : true,
      };
    });
    state.persistent.voiceOptions = voiceOptionsWithEnabledState;
  },
  [wordFilterAdd]: (state: State, action: WordFilterAddAction): void => {
    state.persistent.wordFilter[action.payload.word] =
      action.payload.substitution;
  },
  [wordFilterRemove]: (state: State, action: WordFilterRemoveAction): void => {
    delete state.persistent.wordFilter[action.payload];
  },
});

function getRandomArrayItem<T>(array: Array<T>): T {
  return array[Math.floor(array.length * Math.random())];
}

export default Reducer;
