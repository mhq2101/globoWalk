import { combineReducers } from 'redux';

import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webrtc-reducer';
import auth from './auth';
import panoId from './panoId';
import panoImgSrc from './panoImgSrc';
import mapData from './mapData';
import chatroom from './chatroom';
import audioBuffers from './audioBuffers';
import audioNames from './audioNames';
import audioSource from './audioSource';
import currentSongIndex from './currentSongIndex';
import startTime from './startTime';
import timeStarted from './timeStarted';
import audioStreamSource from './audioStreamSource';
import micConnected from './micConnected';
import musicPlaying from './musicPlaying';
import canDrop from './canDrop';

const rootReducer = combineReducers({
  auth: auth,
  audioStream: audioStream,
  audioCtx: audioContext,
  audioBuffers: audioBuffers,
  audioNames: audioNames,
  audioSource: audioSource,
  currentSongIndex: currentSongIndex,
  audioStreamSource: audioStreamSource,
  startTime: startTime,
  timeStarted: timeStarted,
  webrtc: webRtc,
  chatroom: chatroom,
  panoId: panoId,
  panoImgSrc: panoImgSrc,
	mapData: mapData,
	micConnected: micConnected,
	musicPlaying: musicPlaying,
  canDrop: canDrop
});

export default rootReducer;
