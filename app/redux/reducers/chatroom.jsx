import axios from 'axios';
import store from '../../store';
//import socket from '../socket';

// ACTION TYPES
const SET_CURRENT_CHATROOM = 'SET_CURRENT_CHATROOM';
const GET_CHATROOMS = 'GET_CHATROOMS'
const ADD_CHATROOM = 'ADD_CHATROOM'

// ACTION CREATORS
export function setCurrentChatroom (chatroom) {
  return { type: SET_CURRENT_CHATROOM, chatroom };
}

export function getChatrooms (chatrooms) {
  return { type: GET_CHATROOMS, chatrooms };
}

export function addChatroom (chatroom) {
  return { type: ADD_CHATROOM, chatroom };
}

//Initial State
const initialState = {
  chatroom: {},
  chatrooms: []
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

export const addUserToChatroom = (name) => {
  
    return dispatch =>
      axios.post('/api/chatroom/joinRoom', {name: name})
        .then(res => res.data)
        .then(chatroom => {
          console.log("we outta", chatroom)
          dispatch(setCurrentChatroom(chatroom))
        })
        .catch(error => console.error(error))
  
}

export const fetchChatrooms = (chatroomId) => {
  
    return dispatch =>
      axios.get('/api/chatroom/rooms')
        .then(res => res.data)
        .then(chatrooms => {
          dispatch(getChatrooms(chatrooms))
        })
        .catch(error => console.error(error))
  
}

export const postChatroom = (name) => {
  console.log("asdasd", name)
    return dispatch =>
      axios.post('/api/chatroom/create', {name: name})
        .then(res => res.data)
        .then(chatroom => {
          console.log(chatroom)
          dispatch(addChatroom(chatroom))
        })
        .catch(error => console.error(error))
  
}

// REDUCER
export default function chatroomReducer (state = initialState, action) {

  switch (action.type) {

    case SET_CURRENT_CHATROOM:
      return action.chatroom;

    case GET_CHATROOMS:
      return action.chatrooms;

    case ADD_CHATROOM:
      return [...state, action.chatroom]

    default:
      return state;
  }

}