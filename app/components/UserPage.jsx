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
    //this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    if(this.props.chatroom.chatrooms && event.target.innerHTML !== "Select A Lobby"){
      this.props.joinAndGo(event.target.innerHTML)
    }
  }

 componentDidMount () {
    this.props.fetchChatrooms()
    if (this.props.chatroom.chatroom.id){
      this.props.setCurrentChatroom({})
    }
  }

  componentDidUpdate () {
    if (this.props.chatroom.chatroom.id) {
      (this.props.history.push(`/user/chatroom/${this.props.chatroom.chatroom.name}`))
    }
    if (!this.props.auth.id) {
      (this.props.history.push('/login'))
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
          if(this.props.chatroom.chatrooms){
              this.props.createAndGo(event.target.chatroom.value)
              this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
          }
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="create a chatroom"
          />
          <button type="submit"> Create Room </button>
        </form>
        <Row>
          <Input s={12} type='select' label="Choose from Previous Rooms" onChange={() => this.handleChange(event)}>
            <option key='default'>Select A Lobby</option>
            {
              auth.chatrooms && auth.chatrooms.map((chatroom, ind) => {
                return (
                  <option key={chatroom.id}>{chatroom.name}</option>
                )
              })
            }
          </Input>
        </Row>
        <form onSubmit={(event) => {
          event.preventDefault();
          if(this.props.chatroom.chatrooms){
            this.props.joinAndGo(event.target.chatroom.value)
            this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
          }
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="join a chatroom"
          />
          <button type="submit"> Join Room </button>
        </form>
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