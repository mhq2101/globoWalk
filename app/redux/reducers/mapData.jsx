// ACTIONS
const SET_MAP_DATA = 'SET_MAP_DATA';

// ACTION CREATORS
const setMapData = mapData => ({ type: SET_MAP_DATA, mapData });

// THUNKS
export const setCurrentMapData = mapData => dispatch => {
	dispatch(setMapData(mapData));
};

// REDUCER
export default function (state = {}, action) {
	switch (action.type) {
		case SET_MAP_DATA:
			return action.mapData;
		default:
			return state;
	}
}
