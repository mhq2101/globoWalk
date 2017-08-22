import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

import MusicButton from './MusicButton';

const MusicControls = props => {
	const { controls, controlEvents } = props;

	return (
		<Entity>
			{controls.map((control, index) => <MusicButton key={control} id={control} length={controls.length} index={index} controlEvents={controlEvents} />)}
		</Entity>
	);
};

export default MusicControls;
