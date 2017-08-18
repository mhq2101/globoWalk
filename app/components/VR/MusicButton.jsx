/* eslint id-length: 0 */
import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

const MusicButton = props => {
	const { id, scale, color, index } = props.attr;

	const spacing = scale * 0.1; // spacing between each button
	const offset = scale + spacing; // offsets the buttons so they are spaced evenly
	const startX = -((offset * props.length) / 2) + spacing / 2; // get starting point to render buttons to make sure they are centered
	const currX = startX + offset * index; // convenience variable for where to render the button's x coord

	return (
		<Entity
			id={id}
			src={`#${id}img`}
			primitive="a-plane"
			material={{ color: color }}
			position={{ x: currX, y: 6, z: -4 }}
			rotation={{ x: 24, y: 0, z: 0 }}
			height={scale}
			width={scale}
		/>
	);
};

export default MusicButton;
