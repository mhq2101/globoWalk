import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index.jsx';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {whoami} from './redux/reducers/auth.jsx'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

// Set the auth info at start
store.dispatch(whoami())

export default store;