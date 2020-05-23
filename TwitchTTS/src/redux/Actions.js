/**
 * @flow
 */

import type {
  AudioOutputOption,
  Message,
  PersistentState,
  State,
  VoiceOption,
} from './Reducer';

import {createAction} from '@reduxjs/toolkit';

export type AudioOutputSelectedIDSetAction = {
  type: 'audioOutputs/selected/set',
  payload: ?string,
};
export const audioOutputSelectedIDSet = createAction(
  'audioOutputs/selected/set',
  (selectedAudioOutputID: ?string) => ({payload: selectedAudioOutputID}),
);

export type AudioOutputOptionsSetAction = {
  type: 'audioOutputs/options/set',
  payload: Array<AudioOutputOption>,
};
export const audioOutputOptionsSet = createAction(
  'audioOutputs/options/set',
  (audioOutputs: Array<AudioOutputOption>) => ({payload: audioOutputs}),
);

export type ChannelNameSetAction = {
  type: 'channelName/set',
  payload: string,
};
export const channelNameSet = createAction(
  'channelName/set',
  (channelName: string) => ({payload: channelName}),
);

export type MessageAddAction = {
  type: 'message/add',
  payload: Message,
};
export const messageAdd = createAction('message/add', (message: Message) => ({
  payload: message,
}));

export type PersistentStateSetAction = {
  type: 'persistentState/set',
  payload: PersistentState,
};
export const persistentStateSet = createAction(
  'persistentState/set',
  (persistentState: PersistentState) => ({
    payload: persistentState,
  }),
);

export type SettingsVisibleSetAction = {
  type: 'settings/visible/set',
  payload: boolean,
};
export const settingsVisibleSet = createAction(
  'settings/visible/set',
  (visible: boolean) => ({payload: visible}),
);

export type VoiceEnabledSetAction = {
  type: 'voices/enabled/set',
  payload: {enabled: boolean, id: string},
};
export const voiceEnabledSet = createAction(
  'voices/enabled/set',
  (voiceID: string, enabled: boolean) => ({
    payload: {enabled: enabled, id: voiceID},
  }),
);

export type VoiceOptionsSetAction = {
  type: 'voices/options/set',
  payload: Array<VoiceOption>,
};
export const voiceOptionsSet = createAction(
  'voices/options/set',
  (voiceOptions: Array<VoiceOption>) => ({payload: voiceOptions}),
);

export type WordFilterAddAction = {
  type: 'wordFilter/add',
  payload: {
    word: string,
    substitution: string,
  },
};
export const wordFilterAdd = createAction(
  'wordFilter/add',
  (word: string, substitution: string) => ({
    payload: {
      word,
      substitution,
    },
  }),
);

export type WordFilterRemoveAction = {
  type: 'wordFilter/remove',
  payload: string,
};
export const wordFilterRemove = createAction(
  'wordFilter/remove',
  (word: string) => ({payload: word}),
);
