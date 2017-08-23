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
import { setCurrentPanoId } from '../../redux/reducers/panoId';
import { setCurrentPanoImgSrc } from '../../redux/reducers/panoImgSrc';
import { setCurrentMapData } from '../../redux/reducers/mapData';
import { joinAndGo } from '../../redux/reducers/chatroom.jsx'

class GMapImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showMenu: false };
		this.getPanoramaData = this.getPanoramaData.bind(this);
		this.loadPanoramaData = this.loadPanoramaData.bind(this);
		this.showOrHideMenu = this.showOrHideMenu.bind(this);
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

	showOrHideMenu(){
		this.setState({ showMenu: !this.state.showMenu });
	}

	render() {
		const { panoImgSrc, mapData } = this.props;
		const state = this.state;
		const controls = ['pause', 'stop', 'prev', 'next', 'mute', 'menu'];
		const controlEvents = {
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

const mapStateToProps = ({ panoId, mapData, panoImgSrc, chatroom }) => ({ panoId, mapData, panoImgSrc, chatroom });

const mapDispatchToProps = function (dispatch) {
	return {
		setCurrentPanoId(panoId) {
			dispatch(setCurrentPanoId(panoId));
		},
		setCurrentPanoImgSrc(imgSrc) {
			dispatch(setCurrentPanoImgSrc(imgSrc));
		},
		setCurrentMapData(data) {
			dispatch(setCurrentMapData(data));
		},
		joinAndGo(name) {
			dispatch(joinAndGo(name))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GMapImage);
