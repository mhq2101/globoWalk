import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';
import panoId from './panoId';
import panoImgSrc from './panoImgSrc';
import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webrtc-reducer';
import chatroom from './chatroom';


const rootReducer = combineReducers({
    dummy: dummy,
    auth: auth,
    audioStream: audioStream,
    audioCtx: audioContext,
    webrtc: webRtc,
    panoId: panoId,
    panoImgSrc: panoImgSrc,
    chatroom: chatroom
});

export default rootReducer;
