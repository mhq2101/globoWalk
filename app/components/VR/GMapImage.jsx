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
	const controls = ['play', 'pause', 'stop', 'prev', 'next', 'mute', 'menu'];
	const controlEvents = {
		menu: () => console.log('menu clicked!')
	};

	if (!mapData || !panoImgSrc) return <h3>Loading</h3>;
	return (
		<Scene
			cursor={{ rayOrigin: 'mouse', fuse: false }}
			events={{
				trackpadup: evt => {
					const remote = evt.target;
					const intersected = remote.components.raycaster.intersectedEls;
					if (intersected.length && intersected[0].className === 'buttons') {
						controlEvents[intersected[0].id]();
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
