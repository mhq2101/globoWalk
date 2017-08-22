import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx';
import { setCurrentChatroom, fetchChatrooms, fetchChatroom, postChatroom, joinAndGo, createAndGo } from '../redux/reducers/chatroom';
import { login, logout, signup, postUserChatroom, whoami } from '../redux/reducers/auth';
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import {Row, Input} from 'react-materialize'
import { Link } from 'react-router-dom';
import '../../public/js/app/init.js'

/* -------Component--------- */

class UserPage extends React.Component {

  constructor() {
    super()
  }

 componentDidMount () {
    this.props.fetchChatrooms()
    if (this.props.chatroom.chatroom.id){
      this.props.setCurrentChatroom({})
    }
  }

  render() {
    const { auth, chatroom } = this.props;
    const { chatrooms } = this.props.chatroom
    
    return (
      <div>
        <h1>Welcome User {this.props.auth.name}</h1>
        <button type="submit" onClick={this.props.logout}>Logout</button>
        <form onSubmit={(event) => {
          event.preventDefault()
          {/* this.props.createAndGo(event.target.chatroom.value) */}
          this.props.postChatroom(event.target.chatroom.value)
          this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
          this.props.history.push(`/user/chatroom/${event.target.chatroom.value}`)
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="create a chatroom"
          />
          <button type="submit"> Create Room </button>
        </form>
        <Row>
          <Input s={12} type='select' label="Choose from Previous Rooms" placeholder='Select a Chatroom' defaultValue='1'>
            {
              auth.chatrooms && auth.chatrooms.map((chatroom, ind) => {
                return (
                  <option key={chatroom.id} value={ind}> {chatroom.name} </option>
                )
              })
            }
          </Input>
        </Row>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.joinAndGo(event.target.chatroom.value)
          this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
          console.log(this.props.chatroom.chatroom)
          
            this.props.history.push(`/user/chatroom/${event.target.chatroom.value}`)
          
          {/*this.props.postUserChatroom(event.target.chatroom.value)*/}
          {/*if(this.props.chatroom.chatrooms){
            if(this.props.chatroom.chatrooms.filter(room => event.target.chatroom.value == room.name)[0]){
              joinChatRoom(event.target.chatroom.value)
              this.props.postUserChatroom(event.target.chatroom.value)
              
            }
          }*/}
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="join a chatroom"
          />
          <button type="submit"> Join Room </button>
        </form>
        {/* <button onClick={() => {
          leaveChatRoom(this.props.chatroom.chatroom.name)
          this.setState({
            canJoin: true
          })
        }} disabled={canJoin} > Leave Room </button> */}
      </div>
    )
  }
}



/*-------Container-----------*/




const mapState = ({ auth, chatroom, audioStream, audioCtx }) => ({
  auth,
  chatroom,
  audioStream,
  audioCtx
});

const mapDispatch = function (dispatch) {
  return {
    joinAndGo(name) {
      dispatch(joinAndGo(name))
    },
    createAndGo(name) {
      dispatch(createAndGo(name))
    },
    fetchChatrooms() {
      dispatch(fetchChatrooms());
    },
    whoami() {
     dispatch(whoami());
   },
    setCurrentChatroom(chatroom) {
      dispatch(setCurrentChatroom(chatroom));
    },
    postChatroom(name) {
      dispatch(postChatroom(name))
    },
    addUserToChatroom(name) {
      dispatch(addUserToChatroom(name))
    },
    postUserChatroom(name) {
     dispatch(postUserChatroom(name))
    },
    logout() {
      dispatch(logout())
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(UserPage))