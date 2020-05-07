/**
 * @flow
 */

import type {State} from './Reducer';

export function channelNameSelector(state: State): string {
  return state.channelName;
}

export function wordFilterSelector(
  state: State,
): $PropertyType<State, 'wordFilter'> {
  return state.wordFilter;
}
