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

export function voiceAssignmentSelector(
  state: State,
): $PropertyType<$PropertyType<State, 'voices'>, 'assignments'> {
  return state.voices.assignments;
}

export function voiceOptionsSelector(
  state: State,
): $PropertyType<$PropertyType<State, 'voices'>, 'options'> {
  return state.voices.options;
}

export function wordFilterSelector(
  state: State,
): $PropertyType<State, 'wordFilter'> {
  return state.wordFilter;
}
