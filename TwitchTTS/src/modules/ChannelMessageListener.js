/**
 * @flow
 */

import tmi from 'tmi.js';
import {messageAdd} from '../redux/Actions';
import {channelNameSelector} from '../redux/Selectors';
import Store from '../redux/Store';

type TwitchClient = {
  disconnect: () => Promise<void>,
};

let channelName: string = '';
let twitchClient: ?TwitchClient = null;

export async function initialize() {
  channelName = channelNameSelector(Store.getState());
  await subscribeToMessages();
  Store.subscribe(() => {
    onStoreUpdate();
  });
}

async function subscribeToMessages() {
  if (twitchClient != null) {
    twitchClient.disconnect();
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

async function onStoreUpdate() {
  const newChannelName = channelNameSelector(Store.getState());
  if (newChannelName !== channelName) {
    channelName = newChannelName;
    await subscribeToMessages();
  }
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
  // Remove preprended # from channel when comparing
  if (channel.slice(1).toLowerCase() !== channelName.toLowerCase()) {
    return;
  }
  Store.dispatch(
    messageAdd({
      authorColor: tags['color'],
      authorID: tags['user-id'],
      authorName: tags['display-name'],
      content: message,
      id: tags['id'],
      timestamp: Number(tags['tmi-sent-ts']),
    }),
  );
}
