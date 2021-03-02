/**
 * @flow
 */

import type {
  AudioOutputOption,
  Message,
  PersistentState,
  State,
} from './Reducer';

export function audioOutputOptionsSelector(
  state: State,
): Array<AudioOutputOption> {
  return state.audioOutputOptions;
}

export function audioOutputSelectedIDSelector(state: State): ?string {
  return persistentStateSelector(state).audioOutputSelectedID;
}

export function channelNameSelector(state: State): string {
  return persistentStateSelector(state).channelName;
}

export function messagesSelector(state: State): Array<Message> {
  return state.messages;
}

export function persistentStateSelector(state: State): PersistentState {
  return state.persistent;
}

export function settingsVisibleSelector(state: State): boolean {
  return persistentStateSelector(state).settingsVisible;
}

export function voiceAssignmentSelector(
  state: State,
): $PropertyType<State, 'voiceAssignments'> {
  return state.voiceAssignments;
}

export function voiceOptionsSelector(
  state: State,
): $PropertyType<PersistentState, 'voiceOptions'> {
  return persistentStateSelector(state).voiceOptions;
}

export function volumeSelector(state: State): number {
  return persistentStateSelector(state).volume;
}

export function wordFilterSelector(
  state: State,
): $PropertyType<PersistentState, 'wordFilter'> {
  return persistentStateSelector(state).wordFilter;
}
