import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';
import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webrtc-reducer';



const rootReducer = combineReducers({
    dummy: dummy,
    auth: auth,
    audioStream: audioStream,
    audioCtx: audioContext,
    webrtc: webRtc

});



export default rootReducer;