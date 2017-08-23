/* eslint id-length: 0 */
import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import { setCurrentPanoId } from '../../redux/reducers/panoId';

const GMapArrow = props => {
	const { linkData, headingOffset } = props;

	let heading = linkData.heading - headingOffset - 90;
	heading *= (Math.PI / 180);
	const arrowX = 5 * Math.sin(heading);
	const arrowZ = 5 * Math.cos(heading);

	return (
		<Entity
			id={linkData.pano}
			className={'arrows'}
			primitive={'a-sphere'}
			scale={{ x: 0.15, y: 0.15, z: 0.15 }}
			position={{ x: arrowX, y: 1.5, z: arrowZ }}
			color={'#4CC3D9'}
			events={{
				click: () => props.setCurrentPanoId(linkData.pano),
			}}
		>
			<a-animation
				attribute={'position'}
				from={`${arrowX} 1.5 ${arrowZ}`}
				to={`${arrowX} 1.42 ${arrowZ}`}
				direction={'alternate'}
				dur={'2000'}
				repeat={'indefinite'}
			/>
		</Entity>
	);
};

const mapDispatchToProps = function (dispatch) {
	return {
		setCurrentPanoId(panoId) {
			dispatch(setCurrentPanoId(panoId));
		}
	};
};

export default connect(null, mapDispatchToProps)(GMapArrow);
