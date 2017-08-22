import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx'
import { fetchChatroom, setCurrentChatroom, joinAndGo } from '../redux/reducers/chatroom.jsx'
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import UserPage from './UserPage';
import { NavLink } from 'react-router-dom'

/* -------Component--------- */

class ChatroomPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      currentSong: 0,
      canJoin: false,
      audioBuffer: [],
      audioSource: null,
      audioName: [],
      gain: null,
      canPlay: false,
      canPause: false,
      canStop: false,
      canDrop: true,
      startTime: 0,
      timeStarted: 0,
      canPlayAfterStop: false
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
    const whatever = this;
    AudioDrop({
      context: context,
      elements: window.document.body,
      drop: function (buffer, file) {
        var name = file.name.replace(/\.[^/.]+$/, "");
        if (AudioDrop.isValidVariableName(name)) {
          window[name] = buffer;
          whatever.setState({
            audioBuffer: whatever.state.audioBuffer.concat([buffer]),
            audioName: whatever.state.audioName.concat([name]),
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

  audioPlay(event, context, start, dest, gain, current, nextOrPrev, endStart) {
    
    if (this.state.audioSource !== null) {
      this.state.audioSource.disconnect();
    }
    if (current < 0) {
      current = 0;
      this.setState({
        currentSong: 0
      });
    } else if (current > this.state.audioBuffer.length - 1) {
      current = 0;
      this.setState({
        currentSong: 0
      });
    } else {
      if (nextOrPrev) {
        if (nextOrPrev === 'next') {
          this.setState({
            currentSong: current
          })
        }
        if (nextOrPrev === 'prev') {
          this.setState({
            currentSong: current
          })
        }
      }
    }


    // start the source playing
    var source = context.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = this.state.audioBuffer[current];
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(gain);
    gain.connect(context.destination);
    gain.connect(dest);
    if (event !== null) {
      event.preventDefault();
    }
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
    source.disconnect()
  }
  audioStop(event, source, context, timeAudioStarted) {
    event.preventDefault();
    this.setState({
      start: 0,
      timeStarted: 0,
      canPlay: true,
      canPause: false
    })
    source.disconnect()
  }

  audioConnect(event, source, a) {
    event.preventDefault();
    source.connect(a);
  }
  audioDisconnect(event, source, a) {
    event.preventDefault();
    source.disconnect(a);
  }

  componentDidMount() {
    if (!this.props.chatroom.chatroom.id) {
      this.props.joinAndGo(this.props.match.params.name)
    }
  }

  render() {
    let { currentSong, canJoin, audioBuffer, audioSource, audioName, start, canPlay, canPause, canStop, canDrop, startTime, timeStarted, gain, endStart } = this.state;
    const { audioStream, audioCtx, webrtc } = this.props;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);
    if (audioSource !== null) {
      console.log('aljhsd')
      audioSource.onended = (event) => {
          this.audioPlay(null, audioCtx.audioContext, 0, audioCtx.audioDest, gain, currentSong + 1)
      }
    }
    console.log(audioName)
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
        <h6> Your Playlist ({audioBuffer.length} Songs)
            {
            audioName.map((name, ind) => {
              return (<div key={ind}>{ind + 1}. {name}
                <button
                  onClick={(event) => this.audioPlay(event, audioCtx.audioContext, start, audioCtx.audioDest, gain, ind)}
                >Play<i className="material-icons left">play_arrow</i>
                </button>
              </div>)
            })
          }
        </h6>

        <button
          onClick={(event) => this.audioPlay(event, audioCtx.audioContext, 0, audioCtx.audioDest, gain, currentSong - 1, 'prev')}
        >Previous<i className="material-icons left">skip_previous</i></button>
        <button
          onClick={(event) => this.audioPlay(event, audioCtx.audioContext, start, audioCtx.audioDest, gain, currentSong)}
          disabled={!canPlay}>Play<i className="material-icons left">play_arrow</i></button>
        <button
          onClick={(event) => this.audioPause(event, audioSource, audioCtx.audioContext, start, timeStarted)}
          disabled={!canPause}>Pause<i className="material-icons left">pause</i></button>
        <button
          onClick={(event) => this.audioStop(event, audioSource, audioCtx.audioContext, timeStarted)}
          disabled={!canStop}>Stop<i className="material-icons left">stop</i></button>
        <button
          onClick={(event) => this.audioPlay(event, audioCtx.audioContext, 0, audioCtx.audioDest, gain, currentSong + 1, 'next')}
        >Next<i className="material-icons left">skip_next</i></button>


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
        <button type="submit" onClick={() => this.props.history.push('/location-selection')}>Select Your Location</button>
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
    fetchChatroom(chatroomId) {
      dispatch(fetchChatroom(chatroomId))
    },
    joinAndGo(name) {
      dispatch(joinAndGo(name))
    },
    setCurrentChatroom(chatroomId) {
      dispatch(setCurrentChatroom(chatroomId))
    },
  }
};


export default withRouter(connect(mapState, mapDispatch)(ChatroomPage))