// ACTION TYPES

const UPDATE_CHATROOM_NAME = 'UPDATE_CHATROOM_NAME';

const SET_CURRENT_CHATROOM= 'SET_CURRENT_CHATROOM';

// ACTION CREATORS
export function updateChatroomName (chatroom) {
  return { type: SET_CURRENT_CHATROOM, chatroom };
  
}

//Initial State
const initialState = {
  chatroom: ""
}


// REDUCER
export default function chatroomReducer (state = '', action) {

  switch (action.type) {

    case SET_CURRENT_CHATROOM:
      return action.chatroom;

    default:
      return state;
  }

}