import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {joinChatRoom} from '../webRTC/client.jsx'
import {updateChatroomName} from '../redux/reducers/chatroom'

/* -------Component--------- */

class UserPage extends React.Component {

  
    render() {
        return (
            <div>
                <h1>Welcome User {this.props.auth.email}</h1>
                {/* <form>
                    <input
                        key="chatroom"
                        name="chatroom"
                        placeholder="create chatroom"
                        onChange={this.props.handleChatroomChange}
                        value={this.props.chatroom}
                    />
                </form>
                <button type="submit" onClick={joinChatRoom(this.props.chatroom)}> Join Room {this.props.chatroom} </button> */}
                <button type="submit" onClick={joinChatRoom("lobby")}> Join Room </button>
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