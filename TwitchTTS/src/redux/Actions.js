/**
 * @flow
 */

import {createAction} from '@reduxjs/toolkit';

export type SetChannelAction = {
  type: 'channelName/set',
  payload: string,
};
export const setChannelName = createAction(
  'channelName/set',
  (channelName: string) => ({payload: channelName}),
);

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
