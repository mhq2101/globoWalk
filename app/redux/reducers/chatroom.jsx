// ACTION TYPES

const UPDATE_CHATROOM_NAME = 'UPDATE_CHATROOM_NAME';

// ACTION CREATORS

export function updateChatroomName (chatroom) {
  const action = { type: UPDATE_CHATROOM_NAME, chatroom };
  return action;
}

//Initial State
const initialState = {
  chatroom: ""
}


// REDUCER
export default function chatroomReducer (state = initialState.chatroom, action) {

  switch (action.type) {

    case UPDATE_CHATROOM_NAME:
      return action.chatroom;

    default:
      return state;
  }

}