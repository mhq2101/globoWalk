const audioContext = new AudioContext();
const audioDest = audioContext.createMediaStreamDestination();



const initialState = {
  audioContext,
  audioDest
}



/* --------------- REDUCER --------------- */

export default function reducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
