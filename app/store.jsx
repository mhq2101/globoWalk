import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index.jsx';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);

export default store;