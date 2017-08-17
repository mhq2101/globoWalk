import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

const GMapArrow = ({ linkData, headingOffset }) => {
	let heading = linkData.heading - headingOffset - 90;
	heading *= (Math.PI / 180);

	const arrowX = 5 * Math.sin(heading);
	const arrowZ = 5 * Math.cos(heading);

	return (
		<Entity
			className="selectable"
			id={linkData.pano}
			primitive="a-sphere"
			scale="0.15 0.15 0.15"
			position={`${arrowX}, 1, ${arrowZ}`}
			color="#4CC3D9"
		/>
	);
};

export default GMapArrow;
