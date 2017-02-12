import { remote } from 'electron';

export default function getStreamHost() {
  const streamerPort = remote.getGlobal('streamerPort');
  return `http://localhost:${streamerPort}`;
}
