import React from 'react';
import { connect } from 'react-redux'


/* -------Component--------- */

class Audio extends React.Component {
    constructor(props) {
      super(props)

      this.audioConnect = this.audioConnect.bind(this)
      this.audioDisconnect = this.audioDisconnect.bind(this)
    }

    audioConnect(event, source, audioCtx) {
      event.preventDefault();
      source.connect(audioCtx.destination);
    }
    audioDisconnect(event, source) {
      event.preventDefault();
      source.disconnect();
    }

    render() {

        const {audioStream, audioCtx} = this.props
        const source = audioStream && audioCtx.createMediaStreamSource(audioStream)
      
        return (
            <div>
                <h1>This is the Audio Route</h1>
                
                <button type="submit" onClick={(event) => this.audioConnect(event, source, audioCtx)}>Connect</button>
                <button type="submit" onClick={(event) => this.audioDisconnect(event, source)}>DisConnect</button>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = ({ audioStream, audioCtx }) => ({ audioStream, audioCtx });


export default connect(mapState)(Audio)