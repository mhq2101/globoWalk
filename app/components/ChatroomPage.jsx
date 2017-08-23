import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { leaveChatRoom } from '../webRTC/client.jsx'
import { joinAndGo } from '../redux/reducers/chatroom.jsx'
import AudioDrop from '../webRTC/audioDrop.js';
import Gain from './Gain';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Input, Icon, Table } from 'react-materialize'
import { setSource } from '../redux/reducers/audioSource.jsx';
import { addBuffer } from '../redux/reducers/audioBuffers.jsx';
import { addName } from '../redux/reducers/audioNames.jsx';
import { setCurrent } from '../redux/reducers/currentSongIndex.jsx';

/* -------Component--------- */

class ChatroomPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      canJoin: false,
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
    const thisContext = this;
    AudioDrop({
      context: context,
      elements: window.document.body,
      drop: function (buffer, file) {
        var name = file.name.replace(/\.[^/.]+$/, "");
        if (AudioDrop.isValidVariableName(name)) {
          window[name] = buffer;
          //REDUX!!!!!!
          thisContext.props.addBuffer(buffer);
          thisContext.props.addName(name)
          thisContext.setState({
            canPlay: true // ehh...
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

  audioPlay(event, start, current, nextOrPrev) {

    if (this.props.audioSource !== null) {
      this.props.audioSource.disconnect();
    }
    if (current < 0) {
      current = 0;
      this.props.setCurrent(0);

    } else if (current > this.props.audioBuffers.length - 1) {
      current = 0;
      this.props.setCurrent(0);

    } else {
      this.props.setCurrent(current);
    }


    // start the source playing
    var source = this.props.audioCtx.audioContext.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = this.props.audioBuffers[current];
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(this.props.audioCtx.gain);
    this.props.audioCtx.gain.connect(this.props.audioCtx.audioContext.destination);
    this.props.audioCtx.gain.connect(this.props.audioCtx.audioDest);
    if (event !== null) {
      event.preventDefault();
    }

    this.props.setSource(source)
    //put this on redux
    
    this.setState({
      timeStarted: this.props.audioCtx.audioContext.currentTime, //make redux
      canPlay: false, //ehh...
      canPause: true,
      canStop: true
    })
    source.start(0, start);
  }               
  audioPause(event, start, timeAudioStarted) {
    event.preventDefault();
    // move to redux
    this.setState({
      start: this.props.audioCtx.audioContext.currentTime - timeAudioStarted, //make redux
      canPause: false,
      canPlay: true,
      canStop: true
    })
    this.props.audioSource.disconnect()
  }
  audioStop(event) {
    event.preventDefault();
    this.setState({
      start: 0,
      timeStarted: 0,
      canPlay: true,
      canPause: false
    })
    this.props.audioSource.disconnect()
  }

  audioConnect(event, source) {
    event.preventDefault();
    source.connect(this.props.audioCtx.audioDest);
  }
  audioDisconnect(event, source) {
    event.preventDefault();
    source.disconnect(this.props.audioCtx.audioDest);
  }

  componentDidMount() {
    if (!this.props.chatroom.chatroom.id) {
      this.props.joinAndGo(this.props.match.params.name)
    }
  }

  render() {
    let { canJoin, start, canPlay, canPause, canStop, canDrop, startTime, timeStarted } = this.state;
    const { audioStream, audioCtx, webrtc, audioSource, audioBuffers, audioNames, currentSongIndex } = this.props;
    const { audioContext, audioDest, gain } = this.props.audioCtx;
    const source = audioStream && audioCtx.audioContext.createMediaStreamSource(audioStream);

    if (audioSource !== null) {
      audioSource.onended = (event) => {
        this.audioPlay(null, 0, currentSongIndex + 1)
      }
    }
    return (
      <div className="container">
        <div className="section">
        <h5>Welcome to Chatroom: {this.props.chatroom.chatroom.name}</h5>
        <h5>This is the Audio Section</h5>
        <Row>
          <Col m={6} s={12}>
          <div onClick={(event) => this.audioDropHandle(event, audioCtx.audioContext)}
            disabled={!canDrop} className="file-drop card-panel blue lighten-3">Drop<i className="material-icons medium left">music_note</i>
          </div>
          </Col>
        </Row>

        <p>Your Playlist ({audioBuffers.length} Songs)
            {
            audioNames.map((name, ind) => {
              return (<div key={ind}>{ind + 1}. {name}
                <Button
                  onClick={(event) => this.audioPlay(event, start, ind)}
                >Play<Icon left>play_arrow</Icon>
                </Button>
              </div>)
            })
          }
        </p>

        <Row>
          <Col s={12}>
            <Button className="blue"
              onClick={(event) => this.audioPlay(event, 0, currentSongIndex - 1, 'prev')}
            >Previous<Icon left>skip_previous</Icon></Button>
            <Button className="blue"
              onClick={(event) => this.audioPlay(event, start, currentSongIndex)}
              disabled={!canPlay}>Play<Icon left>play_arrow</Icon></Button>
            <Button className="blue"
              onClick={(event) => this.audioPause(event, start, timeStarted)}
              disabled={!canPause}>Pause<Icon left>pause</Icon></Button>
            <Button className="blue"
              onClick={(event) => this.audioStop(event)}
              disabled={!canStop}>Stop<Icon left>stop</Icon></Button>
            <Button className="blue"
              onClick={(event) => this.audioPlay(event, 0, currentSongIndex + 1, 'next')}
            >Next<Icon left>skip_next</Icon></Button>
          </Col>
            <Button className="btn-music-mobile blue"><Icon>skip_previous</Icon></Button>
            <Button className="btn-music-mobile blue"><Icon>play_arrow</Icon></Button>
            <Button className="btn-music-mobile blue"><Icon>pause</Icon></Button>
            <Button className="btn-music-mobile blue"><Icon>stop</Icon></Button>
            <Button className="btn-music-mobile blue"><Icon>skip_next</Icon></Button>
        </Row>
        {
          gain !== null ? (<Gain node={gain} adjustGainValue={this.adjustGainValue} />) : (<div></div>)
        }

        <Row>
          <Col>
          <Button type="submit" className="blue" onClick={(event) => this.audioConnect(event, source, audioCtx.audioDest)}>Connect Microphone</Button>
          <Button type="submit" className="blue" onClick={(event) => this.audioDisconnect(event, source, audioCtx.audioDest)}>DisConnect Microphone</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button className="blue" onClick={() => {
              leaveChatRoom(this.props.chatroom.chatroom.name)
              this.setState({
                canJoin: true
              })
              this.props.history.push('/user')
            }} disabled={canJoin}>Leave Room<Icon left>chevron_left</Icon></Button>

            <Button type="submit" className="blue" onClick={() => this.props.history.push(`/${this.props.chatroom.chatroom.name}/location-selection`)}>Select Your Location</Button>
          </Col>
        </Row>

        <h3>Users In Group: {this.props.chatroom.name}</h3>
        {/* <table className="table table-responsive table-striped table-hover table-sm"> */}
          <Table responsive striped hoverable>
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
        </Table>
      </div>
      </div>
    )
  }
}



/*-------Container-----------*/




const mapState = ({ auth, chatroom, audioStream, audioBuffers, audioNames, audioSource, currentSongIndex, audioCtx, webrtc }) => ({
  auth,
  chatroom,
  audioStream,
  audioBuffers,
  audioNames,
  audioSource,
  currentSongIndex,
  audioCtx,
  webrtc
});

const mapDispatch = { joinAndGo, setSource, addBuffer, addName, setCurrent }


// const mapDispatch = function (dispatch) {
//   return {
//     joinAndGo(name) {
//       dispatch(joinAndGo(name))
//     }
//   }
// };


export default withRouter(connect(mapState, mapDispatch)(ChatroomPage))