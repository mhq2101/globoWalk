import 'aframe';
import 'aframe-mouse-cursor-component';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import getPanoImg from 'google-panorama-equirectangular';
import getPanoDataId from 'google-panorama-by-id';
import getPanoDataLoc from 'google-panorama-by-location';
import { connect } from 'react-redux';

import GMapArrow from './GMapArrow';
import Assets from './Assets';
import MusicControls from './MusicControls';
import DayDreamController from './DayDreamController';
import MoveLocations from './MoveLocations';

class GMapImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};
		this.getPanoramaData = this.getPanoramaData.bind(this);
		this.loadPanoramaData = this.loadPanoramaData.bind(this);
		this.showOrHideMenu = this.showOrHideMenu.bind(this);
		this.audioPlay = this.audioPlay.bind(this);
		this.audioPause = this.audioPause.bind(this);
		this.audioStop = this.audioStop.bind(this);
		this.audioConnect = this.audioConnect.bind(this);
		this.audioDisconnect = this.audioDisconnect.bind(this);
	}

	componentWillMount() {
		if (!this.props.chatroom.chatroom.id) {
			this.props.joinAndGo(this.props.match.params.name)
		}
		if (this.props.panoId) {
			this.getPanoramaData(this.props.panoId);
		}
	}

	componentWillReceiveProps(newProps) {
		if (this.props.panoId !== newProps.panoId) {
			this.getPanoramaData(newProps.panoId);
		}
	}

	audioPlay(event, start, current) {
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

		this.props.setSource(source);
		this.props.setTime(this.props.audioCtx.audioContext.currentTime);

		if (start === null) {
			source.start(0, this.props.startTime);
		}
		else {
			this.props.setStart(0);
			source.start(0, start);
		}
		this.props.setMusicPlaying(true);
	}

	audioPause(event) {
		event.preventDefault();
		this.props.setStart(this.props.audioCtx.audioContext.currentTime - this.props.timeStarted + this.props.startTime);
		this.props.audioSource.disconnect();
		this.props.setMusicPlaying(false);
	}

	audioStop(event) {
		event.preventDefault();
		this.props.setStart(0);
		this.props.setTime(0);
		this.props.audioSource.disconnect();
		this.props.setMusicPlaying(false);
	}

	audioConnect(event) {
		if (this.props.audioStreamSource !== null) {
			this.props.audioStreamSource.disconnect();
		}
		event.preventDefault();
		const source = this.props.audioStream && this.props.audioCtx.audioContext.createMediaStreamSource(this.props.audioStream);
		this.props.setStreamSource(source);
		source.connect(this.props.audioCtx.audioDest);
		this.props.setMicConnection(true);
	}

	audioDisconnect(event) {
		event.preventDefault();
		this.props.audioStreamSource.disconnect();
		this.props.setMicConnection(false);
	}

	getPanoramaData(panoId) {
		if (typeof panoId === 'string') {
			getPanoDataId(panoId, (err, mapData) => {
				if (err) console.error(err);
				this.props.setCurrentMapData(mapData);
				this.loadPanoramaData(panoId);
			});
		}
		else {
			getPanoDataLoc(panoId, (err, mapData) => {
				if (err) console.error(err);
				this.props.setCurrentMapData(mapData);
				this.loadPanoramaData(mapData.id);
			});
		}
	}

	loadPanoramaData(panoId) {
		getPanoImg(panoId, {
			tiles: this.props.mapData.tiles,
			zoom: 3,
			crossOrigin: 'Anonymous'
		})
			.on('complete', canvas => {
				const panoImg = canvas.toDataURL('image/jpeg');
				this.props.setCurrentPanoImgSrc(panoImg);
			});
	}

	showOrHideMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}

	render() {
		const { panoImgSrc, mapData, currentSongIndex, micConnected, musicPlaying } = this.props;
		const state = this.state;

		const pauseOrPlay = musicPlaying ? 'pause' : 'play';
		const muteOrUnmute = micConnected ? 'mute' : 'unmute';
		const controls = [pauseOrPlay, 'stop', 'prev', 'next', muteOrUnmute, 'menu'];
		const controlEvents = {
			play: {
				click: evt => this.audioPlay(evt, null, currentSongIndex)
			},
			pause: {
				click: evt => this.audioPause(evt)
			},
			stop: {
				click: evt => this.audioStop(evt)
			},
			prev: {
				click: evt => this.audioPlay(evt, 0, currentSongIndex - 1)
			},
			next: {
				click: evt => this.audioPlay(evt, 0, currentSongIndex + 1)
			},
			mute: {
				click: evt => this.audioDisconnect(evt)
			},
			unmute: {
				click: evt => this.audioConnect(evt)
			},
			menu: {
				click: () => this.showOrHideMenu()
			}
		};
		const locations = [
			{
				name: 'Amsterdam, Holland',
				coords: [52.3757185, 4.8859332]
			},
			{
				name: 'Ao Nang, Thailand',
				coords: [8.0304624, 98.8228789]
			},
			{
				name: 'Barcelona, Spain',
				coords: [41.4026222, 2.1743372]
			},
			{
				name: 'Berlin, Germany',
				coords: [52.5150699, 13.39304]
			},
			{
				name: 'Budapest, Hungary',
				coords: [47.5019311, 19.0348175]
			},
			{
				name: 'Florence, Italy',
				coords: [43.7734676, 11.2553835]
			},
			{
				name: 'London, England',
				coords: [51.4990448, -0.1259515]
			},
			{
				name: 'Madrid, Spain',
				coords: [40.4184513, -3.7126664]
			},
			{
				name: 'Paris, France',
				coords: [48.8742824, 2.2931533]
			},
			{
				name: 'Rio, Brazil',
				coords: [-22.9691146, -43.1805221]
			},
			{
				name: 'Rome, Italy',
				coords: [41.8956621, 12.4829993]
			},
			{
				name: 'Tokyo, Japan',
				coords: [35.699646, 139.7714361]
			}
		];

		if (!mapData || !panoImgSrc) return <h3>Loading</h3>;
		return (
			<Scene cursor={{ rayOrigin: 'mouse', fuse: false }}	>
				<Assets controls={controls} />
				<Entity primitive={'a-camera'} wasd-controls-enabled={false} />
				<Entity id={'image-360'} primitive={'a-sky'} src={panoImgSrc} />
				{
					mapData.links.map(link => <GMapArrow key={link.pano} linkData={link} headingOffset={mapData.tiles.originHeading} />)
				}
				<MusicControls controls={controls} controlEvents={controlEvents} />
				{
					state.showMenu && <MoveLocations locations={locations} showOrHideMenu={this.showOrHideMenu} />
				}
				<DayDreamController />
			</Scene>
		);
	}
}

import { setCurrentPanoId } from '../../redux/reducers/panoId';
import { setCurrentPanoImgSrc } from '../../redux/reducers/panoImgSrc';
import { setCurrentMapData } from '../../redux/reducers/mapData';
import { joinAndGo } from '../../redux/reducers/chatroom.jsx';
import { setSource } from '../../redux/reducers/audioSource.jsx';
import { addBuffer } from '../../redux/reducers/audioBuffers.jsx';
import { addName } from '../../redux/reducers/audioNames.jsx';
import { setCurrent } from '../../redux/reducers/currentSongIndex.jsx';
import { setTime } from '../../redux/reducers/timeStarted.jsx';
import { setStart } from '../../redux/reducers/startTime.jsx';
import { setStreamSource } from '../../redux/reducers/audioStreamSource.jsx';
import { setMicConnection } from '../../redux/reducers/micConnected.jsx';
import { setMusicPlaying } from '../../redux/reducers/musicPlaying.jsx';

const mapStateToProps = ({ panoId, mapData, panoImgSrc, chatroom, audioStream, audioBuffers, audioNames, audioSource, currentSongIndex, audioCtx, webrtc, timeStarted, startTime, audioStreamSource, micConnected, musicPlaying }) =>
	({ panoId, mapData, panoImgSrc, chatroom, audioStream, audioBuffers, audioNames, audioSource, currentSongIndex, audioCtx, webrtc, timeStarted, startTime, audioStreamSource, micConnected, musicPlaying });

const mapDispatchToProps = { setCurrentPanoId, setCurrentPanoImgSrc, setCurrentMapData, joinAndGo, setSource, addBuffer, addName, setCurrent, setTime, setStart, setStreamSource, setMicConnection, setMusicPlaying };

export default connect(mapStateToProps, mapDispatchToProps)(GMapImage);
