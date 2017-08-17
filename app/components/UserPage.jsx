import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { joinChatRoom, leaveChatRoom } from '../webRTC/client.jsx';
import { fetchChatrooms, fetchChatroom, postChatroom, addUserToChatroom } from '../redux/reducers/chatroom';
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';


/* -------Component--------- */

class UserPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      canJoin: true,
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
    let { canJoin, audioBuffer, audioSource, audioName, start, canPlay, canPause, canStop, canDrop, startTime, timeStarted, gain } = this.state;
    const { audioStream, audioCtx } = this.props;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);

    return (
      <div>
        <h1>Welcome User {this.props.auth.email}</h1>
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