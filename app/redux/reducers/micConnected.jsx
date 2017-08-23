// ACTIONS
const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';

// ACTION CREATOR
const setConnectionStatus = status => ({ type: SET_CONNECTION_STATUS, status });

const setMicConnection = status => dispatch => {
	dispatch(setConnectionStatus(status));
};
