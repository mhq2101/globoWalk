import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';
import panoId from './panoId';
import panoImgSrc from './panoImgSrc';

const rootReducer = combineReducers({
    dummy: dummy,
		auth: auth,
		panoId: panoId,
		panoImgSrc: panoImgSrc
});

export default rootReducer;
