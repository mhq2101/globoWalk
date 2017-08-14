import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import {connect} from 'react-redux';

import { setCurrentPanoId } from '../redux/reducers/panoId';

const GMapImage = props => {
	console.log('map data', props.mapData);
	return (
		<Scene>
			<a-assets>
				<img id="panorama" crossOrigin="anonymous" src={props.canvToImg} />
			</a-assets>
			<Entity primitive="a-sky" src="#panorama" />
		</Scene>
	);
};

const mapDispatchToProps = { setCurrentPanoId };

export default connect(null, mapDispatchToProps)(GMapImage);
