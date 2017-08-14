const SET_PANO_ID = 'SET_PANO_ID';

const setPanoId = panoId => ({ type: SET_PANO_ID, panoId });

export const setCurrentPanoId = panoId => dispatch => {
	dispatch(setPanoId(panoId));
};

export default function (state = 'zp18ehA20-QAAAQzzZyilA', action) {
	switch (action.type) {
		case SET_PANO_ID:
			return action.panoId;
		default:
			return state;
	}
}
