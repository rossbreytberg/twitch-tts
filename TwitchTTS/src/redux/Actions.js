/**
 * @flow
 */

import {createAction} from '@reduxjs/toolkit';

export type AddMessageAction = {
  type: 'message/add',
  payload: {
    author: string,
    content: string,
  },
};
export const addMessage = createAction(
  'message/add',
  (message: {
    author: string,
    authorColor: string,
    content: string,
    id: string,
  }) => ({
    payload: message,
  }),
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

export type SetChannelAction = {
  type: 'channelName/set',
  payload: string,
};
export const setChannelName = createAction(
  'channelName/set',
  (channelName: string) => ({payload: channelName}),
);
