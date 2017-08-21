import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

const DayDreamController = () => {
	return (
		<Entity
			daydream-controls
			id={'remote'}
			raycaster={{ showLine: true, objects: ['.buttons', '.arrows'], far: 8 }}
			line={{ color: 'red', opacity: 0.75 }}
		/>
	);
};

export default DayDreamController;
