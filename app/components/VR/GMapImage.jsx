import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import GMapArrow from './GMapArrow';
import DayDreamController from './DayDreamController';
import { setCurrentPanoId } from '../../redux/reducers/panoId';

const GMapImage = props => {
	const { panoImgSrc, mapData } = props;
	if (!mapData || !panoImgSrc) return <h3>Loading</h3>;
	return (
		<Scene events={{
			trackpadup: evt => {
				const remote = evt.target;
				const intersected = remote.components.raycaster.intersectedEls;
				if (intersected.length) {
					const panoId = intersected[0].id;
					props.setCurrentPanoId(panoId);
				}
			}
		}}>
			<Entity primitive="a-camera" wasd-controls-enabled="false" />
			<Entity id="image-360" primitive="a-sky" src={panoImgSrc} />
			{
				mapData.links.map(link => <GMapArrow key={link.pano} linkData={link} headingOffset={mapData.tiles.originHeading} />)
			}
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
