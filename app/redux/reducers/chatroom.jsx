import axios from 'axios';
import store from '../../store';
//import socket from '../socket';

// ACTION TYPES
const SET_CURRENT_CHATROOM = 'SET_CURRENT_CHATROOM';


// ACTION CREATORS
export function setCurrentChatroom (chatroom) {
  return { type: SET_CURRENT_CHATROOM, chatroom };
}

//Initial State
const initialState = {
  // chatroom: {}
}

//Thunks
export const fetchChatroom = (chatroomId) => {

  return dispatch =>
    axios.get(`/api/chatroom/room/${chatroomId}`)
      .then(res => res.data)
      .then(chatroom => {
        dispatch(setCurrentChatroom(chatroom))
      })
      .catch(error => console.error(error))

}

// REDUCER
export default function chatroomReducer (state = initialState, action) {

  switch (action.type) {

    case SET_CURRENT_CHATROOM:
      return action.chatroom;

    default:
      return state;
  }

}