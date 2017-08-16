import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

const DayDreamController = () => {
	return (
		<Entity
			daydream-controls
			id="remote"
			raycaster="objects: .selectable"
		>
			<Entity
				id="ray"
				primitive="a-cone"
				color="red"
				position="0 0 -2"
				rotation="-90 0 0"
				radius-bottom="0.005"
				radius-top="0.001"
				height="7"
			/>
			<Entity
				primitive="a-box"
				id="position-guide"
				position="0 0 -2"
				visible="false"
			/>
		</Entity>
	);
};

export default DayDreamController;
