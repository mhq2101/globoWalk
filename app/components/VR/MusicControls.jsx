import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

import MusicButton from './MusicButton';

const MusicControls = props => {
	const { controls } = props;

	return (
		<Entity>
			{controls.map(control => <MusicButton key={control.id} attr={control} length={controls.length} />)}
		</Entity>
	);
};

export default MusicControls;
