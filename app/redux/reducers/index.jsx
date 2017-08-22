import { combineReducers } from 'redux';

import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webrtc-reducer';
import auth from './auth';
import panoId from './panoId';
import panoImgSrc from './panoImgSrc';
import mapData from './mapData';
import chatroom from './chatroom';

const rootReducer = combineReducers({
    auth: auth,
    audioStream: audioStream,
    audioCtx: audioContext,
    webrtc: webRtc,
    chatroom: chatroom,
    panoId: panoId,
	panoImgSrc: panoImgSrc,
	mapData: mapData
});

export default rootReducer;
