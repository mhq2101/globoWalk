import { Map } from 'immutable';

const ICE_SERVERS = [
  { url: 'stun:stun.l.google.com:19302' },
  {
    url: 'turn:numb.viagenie.ca',
    credential: 'muazkh',
    username: 'webrtc@live.com'
  },
  {
    url: 'turn:192.158.29.39:3478?transport=udp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808'
  },
  {
    url: 'turn:192.158.29.39:3478?transport=tcp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808'
  }
];

// This is the state of our current webRtc connections and the media elements associated with them
const initialState = Map({
  peers: Map({}),
  peerMediaElements: Map({})
});
/* --------------- ACTIONS --------------- */

const ADD_PEER = 'ADD_PEER';
const DELETE_PEER = 'DELETE_PEER';
const CLEAR_PEERS = 'CLEAR_PEERS';

/* --------------- ACTION CREATORS --------------- */

export const addPeer = (peerId, peerConnection) => {
  return {
    type: ADD_PEER,
    peerId,
    peerConnection
  };
};

export const deletePeer = (peerId) => {
  return {
    type: DELETE_PEER,
    peerId
  };
};

export const clearPeers = () => {
  return {
    type: CLEAR_PEERS
  };
};

/* --------------- THUNK CREATORS --------------- */


export const addPeerConn = () => dispatch => (config, webRtc, signalingSocket, stream, audioCtx) => {
  console.log('Signaling server said to add peer:', config);
  const peerId = config.peer_id;
  const peers = webrtc.get('peers');
  // If for some reason, this client aready is connected to the peer, return
  if (peers.has(peerId)) {
    console.log('Already connected to peer ', peerId);
    return;
  }

  // Create a webRTC peer connection to the ICE servers
  const peerConnection = new webkitRTCPeerConnection(
    { 'iceServers': ICE_SERVERS },
    { 'optional': [{ 'DtlsSrtpKeyAgreement': true }] }
    /* this will no longer be needed by chrome
    * eventually (supposedly), but is necessary
    * for now to get firefox to talk to chrome */
  );

  // I'm not 100% sure what this does, but it sets up ice candidates ¯\_(ツ)_/¯
  peerConnection.onicecandidate = function (event) {
    if (event.candidate) {
      signalingSocket.emit('relayICECandidate', {
        'peer_id': peerId,
        'ice_candidate': {
          'sdpMLineIndex': event.candidate.sdpMLineIndex,
          'candidate': event.candidate.candidate
        }
      });
    }
  };

  // When we recieve a peer's WebRTC stream, add an audio tag to the DOM with
  //   an ID equal to the peerID, and set it to autoplay.
  peerConnection.onaddstream = function (event) {
    console.log('onAddStream', event);
    const remoteAudio = document.createElement('audio');
    const bodyTag = document.getElementsByTagName('body')[0];
    bodyTag.appendChild(remoteAudio);
    remoteAudio.setAttribute('id', peerId);
    remoteAudio.setAttribute('autoplay', 'autoplay');
    peerMediaElements[peerId] = remoteAudio; // array of the all peer WebRTC streams
    remoteAudio.srcObject = event.stream;
  };
  /* Add our local stream */
  peerConnection.addStream(stream);
  /* Only one side of the peer connection should create the
  * offer, the signaling server picks one to be the offerer.
  * The other user will get a 'sessionDescription' event and will
  * create an offer, then send back an answer 'sessionDescription' to us
  */
  if (config.should_create_offer) {
    console.log('Creating RTC offer to ', peerId);
    peerConnection.createOffer(
      function (localDescription) {
        console.log('Local offer description is: ', localDescription);
        peerConnection.setLocalDescription(localDescription,
          function () {
            signalingSocket.emit('relaySessionDescription',
              { 'peer_id': peerId, 'session_description': localDescription });
            console.log('Offer setLocalDescription succeeded');
          },
          function () { window.alert('Offer setLocalDescription failed!'); }
        );
      },
      function (error) {
        console.log('Error sending offer: ', error);
      }
    );
  }
  dispatch(addPeer(peerId, peerConnection));
}

export function removePeerConn (config) {
  console.log('Signaling server said to remove peer:', config);
  const peerId = config.peer_id;
  if (peerId in peerMediaElements) {
    peerMediaElements[peerId].remove();
  }
  const peers = store.getState().webrtc.get('peers');
  if (peers.has(peerId)) {
    peers.get(peerId).close();
  }
  store.dispatch(deletePeer(peerId));
  delete peerMediaElements[config.peerId];
}

export function setRemoteAnswer (config) {
  console.log('Remote description received: ', config);
  const peerId = config.peer_id;
  const peer = store.getState().webrtc.getIn(['peers', peerId]);
  const remoteDescription = config.session_description;
  console.log(config.session_description);
  const desc = new RTCSessionDescription(remoteDescription);
  const stuff = peer.setRemoteDescription(desc,
    function () {
      console.log('setRemoteDescription succeeded');
      if (remoteDescription.type === 'offer') {
        console.log('Creating answer');
        peer.createAnswer(
          function (localDescription) {
            console.log('Answer description is: ', localDescription);
            peer.setLocalDescription(localDescription,
              function () {
                signalingSocket.emit('relaySessionDescription',
                  { 'peer_id': peerId, 'session_description': localDescription });
                console.log('Answer setLocalDescription succeeded');
              },
              function () { window.alert('Answer setLocalDescription failed!'); }
            );
          },
          function (error) {
            console.log('Error creating answer: ', error);
            console.log(peer);
          }
        );
      }
    },
    function (error) {
      console.log('setRemoteDescription error: ', error);
    }
  );
  console.log('Description Object: ', desc);
}

export function setIceCandidate (config, webRtc) {
  const peer = webrtc.getIn(['peers', config.peer_id]);
  const iceCandidate = config.ice_candidate;
  peer.addIceCandidate(new RTCIceCandidate(iceCandidate));
}

// export function disconnectUser () {
//   for (const peerId in peerMediaElements) {
//     peerMediaElements[peerId].remove();
//   }
//   const peers = store.getState().webrtc.get('peers');
//   peers.valueSeq.forEach(peerConn => {
//     peerConn.close();
//   });
//   store.dispatch(clearPeers());
//   peerMediaElements = {};
// }

/* --------------- REDUCER --------------- */

export default function webrtcReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_PEER:
      return state.setIn(['peers', action.peerId], action.peerConnection);

    case DELETE_PEER:
      return state.deleteIn(['peers', action.peerId]);

    case CLEAR_PEERS:
      // I didn't use .clear here because I want to keep the localMediaStream
      return state.set('peers', Map({})).set('peerMediaElements', Map({}));

    default:
      return state;
  }
}
