import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx';
import { fetchChatrooms, fetchChatroom, postChatroom, addUserToChatroom } from '../redux/reducers/chatroom';
import { login, logout, signup } from '../redux/reducers/auth';
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import { Link } from 'react-router-dom';

/* -------Component--------- */

class UserPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      canJoin: true,
    })
  }

  componentDidMount () {
    this.props.fetchChatrooms()
  }


  render() {
    let { canJoin } = this.state;
    return (
      <div>
        <h1>Welcome User {this.props.auth.email}</h1>
        <button type="submit" onClick={this.props.logout}>Logout</button>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.chatroom && this.props.postChatroom(event.target.chatroom.value)
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="create a chatroom"
          />
          <button type="submit"> Create Room </button>
        </form>
        <form onSubmit={(event) => {
          event.preventDefault()
          if(this.props.chatroom.chatrooms){
            if(this.props.chatroom.chatrooms.filter(room => event.target.chatroom.value == room.name)[0]){
              this.props.addUserToChatroom(event.target.chatroom.value)
              joinChatRoom(event.target.chatroom.value)
              this.setState({
                canJoin: false
              })
            }
          }
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="join a chatroom"
          />
          <button type="submit" disabled={!canJoin}> Join Room </button>
        </form>
        <div>
            {(this.props.chatroom.chatroom.id)
            ? <div>
                <Link to ={`/chatroom/${this.props.chatroom.chatroom.id}`}> Go to Chatroom {this.props.chatroom.chatroom.name} </Link>
              </div>
            : ""
            }
        </div>
        <button onClick={() => {
          leaveChatRoom(this.props.chatroom.chatroom.name)
          this.setState({
            canJoin: true
          })
        }} disabled={canJoin} > Leave Room </button>
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
    fetchChatrooms() {
      dispatch(fetchChatrooms());
    },
    postChatroom(name) {
      dispatch(postChatroom(name))
    },
    addUserToChatroom(name) {
      dispatch(addUserToChatroom(name))
    },
    logout() {
      dispatch(logout())
    }
  };
};

export default connect(mapState, mapDispatch)(UserPage)