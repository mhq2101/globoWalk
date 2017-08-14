import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import { setCurrentPanoId } from '../redux/reducers/panoId';
import clickhandle from '../aframeComponents/ClickHandle';

const GMapImage = props => {
	console.log('map data', props.mapData);
	console.log(props);

	return (
		<Scene>
			<a-assets>
				<img id="panorama" crossOrigin="anonymous" src={props.panoImgSrc} />
			</a-assets>
			<Entity primitive="a-sky" src="#panorama" />
			<Entity id="click-box" clickhandle={props.setCurrentPanoId} primitive="a-box" position="1, -1.5, 3" roation="0 45 0" color="#4CC3D9" />
			<a-camera>
				<a-cursor />
			</a-camera>
		</Scene>
	);
};

const mapDispatchToProps = { setCurrentPanoId };

export default connect(null, mapDispatchToProps)(GMapImage);
