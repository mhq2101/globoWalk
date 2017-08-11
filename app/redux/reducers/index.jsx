import { combineReducers } from 'redux';
import dummy from './dummy.jsx';
import auth from './auth';


const rootReducer = combineReducers({
    dummy: dummy,
    auth: auth
});



export default rootReducer;