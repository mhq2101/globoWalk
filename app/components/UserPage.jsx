import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx'
import { updateChatroomName } from '../redux/reducers/chatroom'

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

  audioConnect(event, source, a) {
    event.preventDefault();
    source.connect(a);
  }
  audioDisconnect(event, source, a) {
    event.preventDefault();
    source.disconnect(a);
  }

  render() {
    let { canJoin } = this.state;
    const {audioStream, audioCtx} = this.props;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);
    console.log(source)
    console.log(audioCtx.audioDest)
    return (
      <div>
        <h1>Welcome User {this.props.auth.email}</h1>
        <h2>This is the Audio Section</h2>
        <button type="submit" onClick={(event) => this.audioConnect(event, source, audioCtx.audioDest)}>Connect</button>
        <button type="submit" onClick={(event) => this.audioDisconnect(event, source, audioCtx.audioDest)}>DisConnect</button>

        <form onSubmit={(event) => {
          event.preventDefault()
          joinChatRoom(event.target.chatroom.value)
          this.setState({
            canJoin: false
          })
        }}>
          <input
            key="chatroom"
            name="chatroom"
            placeholder="create chatroom"

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

// const mapDispatch = function (dispatch) {
//   return {
//     handleChatroomChange(evt) {
//       dispatch(updateChatroomName(evt.target.value));
//     }
//   };
// };

export default connect(mapState)(UserPage)