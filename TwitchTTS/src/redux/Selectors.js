/**
 * @flow
 */

import type {State} from './Reducer';

export function channelNameSelector(state: State): string {
  return state.channelName;
}

export function messagesSelector(
  state: State,
): $PropertyType<State, 'messages'> {
  return state.messages;
}

export function wordFilterSelector(
  state: State,
): $PropertyType<State, 'wordFilter'> {
  return state.wordFilter;
}
