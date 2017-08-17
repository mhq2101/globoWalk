import axios from 'axios';
import store from '../../store';

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
          dispatch(setCurrentChatroom(chatroom))
          window.socket.emit('userInfo', store.getState().auth.id, name)
        })
        .catch(error => console.error(error))
  
}

export const removeUserFromChatroom = (name) => {

    return dispatch =>
      axios.delete('/api/chatroom/leaveRoom', {data:{name: name}})
        .then(res => res.data)
        .then(chatroom => {
          dispatch(setCurrentChatroom(initialState))
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

    return dispatch =>
      axios.post('/api/chatroom/create', {name: name})
        .then(res => res.data)
        .then(chatroom => {
          dispatch(addChatroom(chatroom))
        })
        .catch(error => console.error(error))
  
}

// REDUCER
export default function chatroomReducer (state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {

    case SET_CURRENT_CHATROOM:
      newState.chatroom = action.chatroom;
      break

    case GET_CHATROOMS:
      newState.chatrooms = action.chatrooms;
      break

    case ADD_CHATROOM:
      newState.chatrooms = [...newState.chatrooms, action.chatroom]
      break

    default:
      return newState;
  }
  return newState
}