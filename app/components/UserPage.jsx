import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {joinChatRoom, leaveChatRoom} from '../webRTC/client.jsx'
import {updateChatroomName} from '../redux/reducers/chatroom'

/* -------Component--------- */

class UserPage extends React.Component {

    constructor() {
      super()
      this.state = ({
        canJoin: true
      })
    }

  
    render() {
      let {canJoin} = this.state;
        return (
            <div>
                <h1>Welcome User {this.props.auth.email}</h1>
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


const mapState = ({ auth, chatroom }) => ({
    auth,
    chatroom
});

const mapDispatch = function (dispatch) {
  return {
    handleChatroomChange (evt) {
        dispatch(updateChatroomName(evt.target.value));
    }
  };
};

export default connect(mapState, mapDispatch)(UserPage)