import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

import MusicButton from './MusicButton';

const MusicControls = props => {
	const { controls } = props;

	return (
		<Entity>
			{controls.map((control, index) => <MusicButton key={control} attr={control} length={controls.length} index={index} />)}
		</Entity>
	);
};

export default MusicControls;
