const { createStore, applyMiddleware, combineReducers } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const {createLogger} =  require('redux-logger');

// const { userReducer } = require('./reducers/user-reducer');
const { roomReducer } = require('./reducers/room-reducer');
const { socketReducer } = require('./reducers/socket-reducer');

const rootReducer = combineReducers({
  // users: userReducer,
  rooms: roomReducer,
  sockets: socketReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    // createLogger()
  )
);

module.exports = store;
