import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx'
import { fetchChatroom } from '../redux/reducers/chatroom.jsx'

/* -------Component--------- */

class ChatroomPage extends React.Component {

  componentDidMount () {
    this.props.fetchChatroom(this.props.match.params.id)
  }

  render() {
    console.log("props", this.props.chatroom.chatroom.users)
    return (
      <div>
        <h1>Welcome to Chatroom {this.props.chatroom.name}</h1>
        <h3>The users currently in this lobby are: {this.props.chatroom.name}</h3>
        <table className="table table-responsive table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {this.props.chatroom.chatroom.users && this.props.chatroom.chatroom.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
              )
          })}
          </tbody>
        </table>
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
      fetchChatroom (chatroomId) {
        dispatch(fetchChatroom(chatroomId))
      }
    }
};


export default connect(mapState, mapDispatch)(ChatroomPage)