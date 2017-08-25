/* --------------- ACTIONS --------------- */

const SET_USER_MEDIA = 'SET_USER_MEDIA';


/* --------------- ACTION CREATORS --------------- */

export const setUserMedia = (stream) => {
  return {
    type: SET_USER_MEDIA,
    stream
  };
};
/* --------------- THUNK CREATORS --------------- */



export const fetchAudio = () => dispatch => {

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getUserMedia({ 'audio': true },
    // On Success
    function (stream) {
      dispatch(setUserMedia(stream));
    },
    // On Failure
    function () {});
}



/* --------------- REDUCER --------------- */

export default function reducer(state = '', action) {
  switch (action.type) {

    case SET_USER_MEDIA:
      return action.stream

    default:
      return state;
  }
}
