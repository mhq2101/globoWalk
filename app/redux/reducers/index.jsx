import { combineReducers } from 'redux';

import dummy from './dummy.jsx';
import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webrtc-reducer';
import auth from './auth';
import panoId from './panoId';
import panoImgSrc from './panoImgSrc';
import mapData from './mapData';

const rootReducer = combineReducers({
  dummy: dummy,
  auth: auth,
  audioStream: audioStream,
  audioCtx: audioContext,
  webrtc: webRtc,
  panoId: panoId,
	panoImgSrc: panoImgSrc,
	mapData: mapData
});

export default rootReducer;
