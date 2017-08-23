const audioContext = new AudioContext();
const audioDest = audioContext.createMediaStreamDestination();
const gain = audioContext.createGain();



const initialState = {
  audioContext,
  audioDest,
  gain
}



/* --------------- REDUCER --------------- */

export default function reducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
