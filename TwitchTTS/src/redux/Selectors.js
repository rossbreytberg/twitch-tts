/**
 * @flow
 */

import type {Message, PersistentState, State} from './Reducer';

export function channelNameSelector(state: State): string {
  return persistentStateSelector(state).channelName;
}

export function messagesSelector(state: State): Array<Message> {
  return state.messages;
}

export function persistentStateSelector(state: State): PersistentState {
  return state.persistent;
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
): $PropertyType<PersistentState, 'wordFilter'> {
  return persistentStateSelector(state).wordFilter;
}
