/**
 * @flow
 */

import type {Message, VoiceOption} from './Reducer';

import {createAction} from '@reduxjs/toolkit';

export type AddMessageAction = {
  type: 'message/add',
  payload: Message,
};
export const addMessage = createAction('message/add', (message: Message) => ({
  payload: message,
}));

export type AddWordFilterAction = {
  type: 'wordFilter/add',
  payload: {
    word: string,
    substitution: string,
  },
};
export const addWordFilter = createAction(
  'wordFilter/add',
  (word: string, substitution: string) => ({
    payload: {
      word,
      substitution,
    },
  }),
);

export type RemoveWordFilterAction = {
  type: 'wordFilter/remove',
  payload: string,
};
export const removeWordFilter = createAction(
  'wordFilter/remove',
  (word: string) => ({payload: word}),
);

export type SetChannelAction = {
  type: 'channelName/set',
  payload: string,
};
export const setChannelName = createAction(
  'channelName/set',
  (channelName: string) => ({payload: channelName}),
);

export type SetVoiceEnabledAction = {
  type: 'voices/enabled/set',
  payload: {enabled: boolean, id: string},
};
export const setVoiceEnabled = createAction(
  'voices/enabled/set',
  (voiceID: string, enabled: boolean) => ({
    payload: {enabled: enabled, id: voiceID},
  }),
);

export type SetVoiceOptionsAction = {
  type: 'voices/options/set',
  payload: Array<VoiceOption>,
};
export const setVoiceOptions = createAction(
  'voices/options/set',
  (voiceOptions: Array<VoiceOption>) => ({payload: voiceOptions}),
);
