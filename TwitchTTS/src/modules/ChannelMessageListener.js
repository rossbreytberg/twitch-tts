/**
 * @flow
 */

import {NativeEventEmitter, NativeModules} from 'react-native';
import tmi from 'tmi.js';
import {addMessage} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';
import Store from '../redux/Store';

const {TextToSpeech} = NativeModules;
const TextToSpeechEventEmitter = new NativeEventEmitter(TextToSpeech);

type TwitchClient = {
  disconnect: () => Promise<void>,
};

let channelName: string = '';
let twitchClient: ?TwitchClient = null;

export function initialize() {
  channelName = channelNameSelector(Store.getState());
  Store.subscribe(onStoreUpdate);
  TextToSpeechEventEmitter.addListener('OnSpeak', result =>
    console.log('OnSpeak', result),
  );
}

async function onStoreUpdate() {
  const newChannelName = channelNameSelector(Store.getState());
  if (newChannelName === channelName) {
    return;
  }
  channelName = newChannelName;
  if (twitchClient != null) {
    await twitchClient.disconnect();
  }
  if (channelName === '') {
    twitchClient = null;
    return;
  }
  twitchClient = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [channelName],
  });
  twitchClient.on('message', onMessage);
  await twitchClient.connect();
}

function onMessage(
  channel: string,
  tags: {
    color: string,
    'display-name': string,
    id: string,
    mod: boolean,
    'room-id': string,
    subscriber: boolean,
    'tmi-sent-ts': string,
    turbo: boolean,
    'user-id': string,
    username: string,
  },
  message: string,
  self: boolean,
): void {
  TextToSpeech.speak(message);
  Store.dispatch(
    addMessage({
      author: tags['display-name'],
      authorColor: tags['color'],
      content: message,
      id: tags['id'],
      timestamp: Number(tags['tmi-sent-ts']),
    }),
  );
}
