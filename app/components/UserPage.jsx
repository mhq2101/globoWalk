import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx';
import { setCurrentChatroom, fetchChatrooms, fetchChatroom, joinAndGo, joinAndGoNoCatch, createAndGo } from '../redux/reducers/chatroom';
import { login, logout, signup, postUserChatroom } from '../redux/reducers/auth';
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import {ToastContainer, ToastMessage} from 'react-toastr'
import { Row, Col, Input, Navbar, NavItem, Icon, Button } from 'react-materialize';
import NavBar from './NavBar.jsx'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

/* -------Component--------- */

class UserPage extends React.Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.addCreateAlert = this.addCreateAlert.bind(this)
    this.submitCreateHandler = this.submitCreateHandler.bind(this)
    this.submitJoinHandler = this.submitJoinHandler.bind(this)
  }

  addCreateAlert () {
    this.container.error(
      "",
      "Chatroom Already Exists", {
      timeOut: 6000,
      extendedTimeOut: 1500
    });
  }

  addJoinAlert () {
    this.container.error(
      "",
      "Chatroom Doesn't Exist", {
      timeOut: 6000,
      extendedTimeOut: 1500
    });
  }

  submitCreateHandler(event) {
    event.preventDefault();
    if(this.props.chatroom.chatrooms){
      this.props.createAndGo(event.target.chatroom.value).catch(err => {
        if (err) this.addCreateAlert()
      })
      this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
    }
  }

  submitJoinHandler(event) {
    event.preventDefault()
    if(this.props.chatroom.chatrooms){
        this.props.joinAndGoNoCatch(event.target.chatroom.value).catch(err => {
          if (err) this.addJoinAlert()
        })
        this.props.chatroom && this.props.postUserChatroom(event.target.chatroom.value)
    }
  }

  handleChange(event) {
    event.preventDefault()
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
        <ToastContainer ref={(input) => {this.container = input;}}
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
        />
        <NavBar/>
        <div className="container">
          <div className="section">
          <Row>
            <Col m={9} offset="m3">
              <h4>Create a New Group</h4>
              <form onSubmit={this.submitCreateHandler}>
                <Row>
                  <Input
                    s={12}
                    m={8}
                    key="chatroom"
                    name="chatroom"
                    placeholder="Enter a New Group Name"
                  />
                </Row>
                <Row>
                  <Col m={10} offset="m2">
                    <Button className="btn-login" type="submit"> Create Group </Button>
                  </Col>
                </Row>
              </form>
              <Row/>
              <h4 className="left-align"> Or Join an Existing Group</h4>
              <Row>
                {this.props.auth.chatrooms &&
                <Input s={12} m={8} type='select' onChange={() => this.handleChange(event)}>
                  <option key='default'>Select From Previous Groups</option>
                  {
                    auth.chatrooms.map((chatroom, ind) => {
                      return (
                        <option key={chatroom.id}>{chatroom.name}</option>
                      )
                    })
                  }
                </Input>
                }
              </Row>
              <form onSubmit={this.submitJoinHandler}>
                <Row>
                  <Input
                    s={12}
                    m={8}
                    key="chatroom"
                    name="chatroom"
                    placeholder="Enter an Existing Group's Name"
                  />
                  <Col m={10} offset="m2">
                    <Button className="btn-login" type="submit"> Join Group </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
          </div>
        </div>
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
    joinAndGoNoCatch(name) {
      return dispatch(joinAndGoNoCatch(name))
      dispatch(joinAndGoNoCatch(name))
    },
    createAndGo(name) {
      return dispatch(createAndGo(name))
      dispatch(createAndGo(name))
    },
    fetchChatrooms() {
      dispatch(fetchChatrooms());
    },
    setCurrentChatroom(chatroom) {
      dispatch(setCurrentChatroom(chatroom));
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