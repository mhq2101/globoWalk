import 'aframe';
import 'aframe-mouse-cursor-component';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import GMapArrow from './GMapArrow';
import Assets from './Assets';
import MusicControls from './MusicControls';
import DayDreamController from './DayDreamController';
import { setCurrentPanoId } from '../../redux/reducers/panoId';

const GMapImage = props => {
	const { panoImgSrc, mapData } = props;
	const scale = 0.5;
	const color = 'gray';
	const controls = [
		{
			id: 'play',
			index: 0,
			src: 'images/play.png',
			scale,
			color,
		},
		{
			id: 'pause',
			index: 1,
			src: 'images/pause.png',
			scale,
			color,
		},
		{
			id: 'stop',
			index: 2,
			src: 'images/stop.png',
			scale,
			color,
		},
		{
			id: 'prev',
			index: 3,
			src: 'images/prev.png',
			scale,
			color,
		},
		{
			id: 'next',
			index: 4,
			src: 'images/next.png',
			scale,
			color,
		},
		{
			id: 'mute',
			index: 5,
			src: 'images/mute.png',
			scale,
			color,
		}
	];

	if (!mapData || !panoImgSrc) return <h3>Loading</h3>;
	return (
		<Scene
			cursor="rayOrigin: mouse; fuse: false"
			events={{
				trackpadup: evt => {
					const remote = evt.target;
					const intersected = remote.components.raycaster.intersectedEls;
					if (intersected.length) {
						const panoId = intersected[0].id;
						props.setCurrentPanoId(panoId);
					}
				}
			}}
		>
			<Assets controls={controls} />
			<Entity primitive="a-camera" wasd-controls-enabled="false" />
			<Entity id="image-360" primitive="a-sky" src={panoImgSrc} />
			{
				mapData.links.map(link => <GMapArrow key={link.pano} linkData={link} headingOffset={mapData.tiles.originHeading} />)
			}
			<MusicControls controls={controls} />
			<DayDreamController />
		</Scene>
	);
};

const mapStateToProps = ({ panoImgSrc, mapData }) => ({ panoImgSrc, mapData });

const mapDispatchToProps = function (dispatch) {
	return {
		setCurrentPanoId(panoId) {
			dispatch(setCurrentPanoId(panoId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GMapImage);
