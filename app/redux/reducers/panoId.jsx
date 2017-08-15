// ACTIONS
const SET_PANO_ID = 'SET_PANO_ID';

// ACTION CREATORS
const setPanoId = panoId => ({ type: SET_PANO_ID, panoId });

// THUNKS
export const setCurrentPanoId = panoId => dispatch => {
	dispatch(setPanoId(panoId));
};

// REDUCER
export default function (state = '', action) {
	switch (action.type) {
		case SET_PANO_ID:
			return action.panoId;
		default:
			return state;
	}
}
