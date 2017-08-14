import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {joinChatRoom} from '../webRTC/client.jsx'


/* -------Component--------- */

class UserPage extends React.Component {

    componentDidMount() {
      // store.dispatch(fetchAudio())
      joinChatRoom('lobby')
      
    }
  
    render() {
        return (
            <div>
                <h1>Welcome User {this.props.auth.email}</h1>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = ({ auth }) => ({
    auth 
});

const mapDispatch = dispatch => ({

});

export default connect(mapState, mapDispatch)(UserPage)