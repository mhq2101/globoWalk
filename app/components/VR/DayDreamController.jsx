import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

const DayDreamController = () => {
	return (
		<Entity
			daydream-controls
			id="remote"
			raycaster="showLine: true; objects: .selectable; far: 6"
			line="color: red; opacity: 0.75"
		/>
	);
};

export default DayDreamController;
