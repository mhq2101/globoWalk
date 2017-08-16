import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx'
import { fetchChatrooms, fetchChatroom, postChatroom, addUserToChatroom } from '../redux/reducers/chatroom'

/* -------Component--------- */

class UserPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      canJoin: true
    })

    this.audioConnect = this.audioConnect.bind(this)
    this.audioDisconnect = this.audioDisconnect.bind(this)
  }

  componentDidMount () {
    this.props.fetchChatrooms()
  }

  audioConnect(event, source, a) {
    event.preventDefault();
    source.connect(a);
  }
  audioDisconnect(event, source, a) {
    event.preventDefault();
    source.disconnect(a);
  }

  render() {
    console.log("we da props", this.props.chatroom)
    let { canJoin } = this.state;
    const {audioStream, audioCtx} = this.props;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);
    console.log(source)
    console.log(audioCtx.audioDest)
    return (
      <div>
        <h1>Welcome User {this.props.auth.email}</h1>
        <h2>This is the Audio Section</h2>
        <button type="submit" onClick={(event) => this.audioConnect(event, source, audioCtx.audioDest)}>Connect Microphone</button>
        <button type="submit" onClick={(event) => this.audioDisconnect(event, source, audioCtx.audioDest)}>Mute Microphone</button>
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
          if(this.props.chatroom){
            if(this.props.chatroom.filter(room => event.target.chatroom.value == room.name)[0]){
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
        <button onClick={() => {
          leaveChatRoom()
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
    }
  };
};

export default connect(mapState, mapDispatch)(UserPage)