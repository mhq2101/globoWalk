import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';
import panoId from './panoId';

const rootReducer = combineReducers({
    dummy: dummy,
		auth: auth,
		panoId: panoId
});

export default rootReducer;
