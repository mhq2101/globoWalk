import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx'
import { fetchChatroom, setCurrentChatroom, joinAndGo } from '../redux/reducers/chatroom.jsx'
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import UserPage from './UserPage';
import {NavLink} from 'react-router-dom'

/* -------Component--------- */

class ChatroomPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      canJoin: false,
      audioBuffer: null,
      audioSource: null,
      audioName: null,
      gain: null,
      canPlay: false,
      canPause: false,
      canStop: false,
      canDrop: true,
      startTime: 0,
      timeStarted: 0
    })

    this.adjustGainValue = this.adjustGainValue.bind(this);
    this.audioPlay = this.audioPlay.bind(this);
    this.audioPause = this.audioPause.bind(this);
    this.audioStop = this.audioStop.bind(this);
    this.audioDropHandle = this.audioDropHandle.bind(this);
    this.audioConnect = this.audioConnect.bind(this);
    this.audioDisconnect = this.audioDisconnect.bind(this);
  }

  adjustGainValue(node, event) {
    const value = event.target.value
    node.gain.value = value
  }

  audioDropHandle(event, context) {
    event.preventDefault();
    const gainNode = context.createGain();
    this.setState({
      gain: gainNode
    })
    const whatever = this
    AudioDrop({
      context: context,
      elements: window.document.body,
      drop: function (buffer, file) {
        var name = file.name.replace(/\.[^/.]+$/, "");
        if (AudioDrop.isValidVariableName(name)) {
          window[name] = buffer;
          whatever.setState({
            audioBuffer: buffer,
            audioName: name,
            canPlay: true
          })
          console.log('Added the variable "' + name + '"" to the window.');
        } else {
          window[name + '-sample'] = buffer;
          console.log('Added the variable window["' + name + '-sample"] to the window.');
        }
      }
    });
    this.setState({
      canDrop: false
    })
  }

  audioPlay(event, buffer, context, start, dest, gain) {
    // start the source playing
    var source = context.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = buffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(gain);
    gain.connect(context.destination);
    gain.connect(dest);
    event.preventDefault();
    this.setState({
      audioSource: source,
      timeStarted: context.currentTime,
      canPlay: false,
      canPause: true,
      canStop: true
    })
    source.start(0, start);
  }
  audioPause(event, source, context, start, timeAudioStarted) {
    event.preventDefault();
    this.setState({
      start: context.currentTime - timeAudioStarted,
      canPause: false,
      canPlay: true,
      canStop: true
    })
    source.stop();
  }
  audioStop(event, source, context, timeAudioStarted) {
    event.preventDefault();
    this.setState({
      start: 0,
      timeStarted: 0,
      canPlay: true,
      canPause: false
    })
    source.stop();
  }

  audioConnect(event, source, a) {
    event.preventDefault();
    source.connect(a);
  }
  audioDisconnect(event, source, a) {
    event.preventDefault();
    source.disconnect(a);
  }

  componentDidMount () {
    if(!this.props.chatroom.chatroom.id){
      this.props.joinAndGo(this.props.match.params.name)
    }
  }

  componentWillUnmount () {
    this.props.setCurrentChatroom({})
  }

  render() {
    let { canJoin, audioBuffer, audioSource, audioName, start, canPlay, canPause, canStop, canDrop, startTime, timeStarted, gain } = this.state;
    const { audioStream, audioCtx, webrtc } = this.props;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);
    // console.log(webrtc && webrtc.get('peerNames').valueSeq().toArray())
    // if(this.props.chatroom.chatroom && this.props.chatroom.chatroom.users && this.props.chatroom.chatroom.users.filter((user) => user.id === this.props.auth.id)[0]) {
    //   console.log(this.props.chatroom.chatroom.users.filter((user) => user.id === this.props.auth.id))
      return (
        <div>
          <h1>Welcome to Chatroom {this.props.chatroom.chatroom.name}</h1>
          <h2>This is the Audio Section
            <button onClick={(event) => this.audioDropHandle(event, audioCtx.audioContext)}
              disabled={!canDrop}> Drop<i className="material-icons medium left">music_note</i></button>
          </h2>
          {
              audioName !== null ? (<div>Sound file = {audioName}</div>) : (<div></div>)
            }
          
            <button
              onClick={(event) => this.audioPlay(event, audioBuffer, audioCtx.audioContext, start, audioCtx.audioDest, gain)}
              disabled={!canPlay}>Play<i className="material-icons left">play_arrow</i></button>
            <button
              onClick={(event) => this.audioPause(event, audioSource, audioCtx.audioContext, start, timeStarted)}
              disabled={!canPause}>Pause<i className="material-icons left">pause</i></button>
            <button
              onClick={(event) => this.audioStop(event, audioSource, audioCtx.audioContext, timeStarted)}
              disabled={!canStop}>Stop<i className="material-icons left">stop</i></button>
              

              {
                gain !== null ? (<Gain node={gain} adjustGainValue={this.adjustGainValue} />) : (<div></div>)
              }
            
          <button type="submit" onClick={(event) => this.audioConnect(event, source, audioCtx.audioDest)}>Connect Microphone</button>
          <button type="submit" onClick={(event) => this.audioDisconnect(event, source, audioCtx.audioDest)}>DisConnect Microphone</button>
          
          <button onClick={() => {
            leaveChatRoom(this.props.chatroom.chatroom.name)
            this.setState({
              canJoin: true
            })
            this.props.history.push('/user')
          }} disabled={canJoin} > Leave Room </button>
          
          <h3>The users currently in this lobby are: {this.props.chatroom.name}</h3>
          <table className="table table-responsive table-striped table-hover table-sm">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {webrtc && webrtc.get('peerNames').valueSeq().toArray().map(name => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                </tr>
                )
            })}
            </tbody>
          </table>
        </div>
      )
    }
  //   else {
  //     return(
  //       <NavLink
  //         activeClassName= "active"
  //         to={'/user'}
  //       >
  //         <div>
  //           You have been disconnected from the chatroom, click here to return to the User Page
  //         </div>
  //       </NavLink>
  //     )
  //   }
  //}
}



/*-------Container-----------*/




const mapState = ({ auth, chatroom, audioStream, audioCtx, webrtc }) => ({
  auth,
  chatroom,
  audioStream,
  audioCtx,
  webrtc
});

const mapDispatch = function (dispatch) {
    return {
      fetchChatroom (chatroomId) {
        dispatch(fetchChatroom(chatroomId))
      },
      joinAndGo (name) {
        dispatch(joinAndGo(name))
      },
      setCurrentChatroom (chatroomId) {
        dispatch(setCurrentChatroom(chatroomId))
      },
    }
};


export default withRouter(connect(mapState, mapDispatch)(ChatroomPage))