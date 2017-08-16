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
    return (
      <div>
        <h1>Welcome to Chatroom</h1>
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