import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';
import audioStream from './audioStream';
import audioContext from './audioContext';
import webRtc from './webRtc';



const rootReducer = combineReducers({
    dummy: dummy,
    auth: auth,
    audioStream: audioStream,
    audioCtx: audioContext,
    webRtc: webRtc

});



export default rootReducer;