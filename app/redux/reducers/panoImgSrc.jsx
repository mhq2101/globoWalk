// ACTIONS
const SET_PANO_SRC = 'SET_PANO_SRC';

// ACTION CREATORS
const setPanoImgSrc = panoImgSrc => ({ type: SET_PANO_SRC, panoImgSrc });

// THUNKS
export const setCurrentPanoImgSrc = panoImgSrc => dispatch => {
		dispatch(setPanoImgSrc(panoImgSrc));
};

// REDUCER
export default function (state = '', action) {
	switch (action.type) {
		case SET_PANO_SRC:
			return action.panoImgSrc;
		default:
			return state;
	}
}
