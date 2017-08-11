import axios from 'axios';
import { browserHistory } from 'react-router';
import store from '../../store';

/* --------------- INITIAL STATE --------------- */

const initialState = "";

/* --------------- ACTIONS --------------- */

const AUTHENTICATED = 'AUTHENTICATED';

/* --------------- ACTION CREATORS --------------- */

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const signup = (email, password) => {
  return dispatch =>
    axios.post('/api/auth/signup', { email, password })
      .then(response => dispatch(login(email, password)))
      .catch(err => console.log(err.message));
};

export const login = (username, password) => {
  return dispatch =>
    axios.post('/api/auth/login', { username, password })
      .then(response => {
        const user = response.data;
        dispatch(authenticated(user));
      })
      .then(() => browserHistory.push('/vr'))
      .catch(err => {
        console.error(err)
      });
};

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () => {
  return dispatch =>
    axios.get('/api/auth/me')
      .then(response => {
        const user = response.data;
        dispatch(authenticated(user));
      })
      .catch(failed => console.error(err));
};

/* --------------- REDUCER --------------- */

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
  }
  return state;
}