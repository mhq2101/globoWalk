import 'aframe';
import React from 'react';

const Assets = props => {
	const { controls } = props;

	return (
		<a-assets>
			{
				controls.map(control => <img key={`${control}img`} id={`${control}img`} crossOrigin="anonymous" src={`images/${control}.png`} />)
			}
		</a-assets>
	);
};

export default Assets;
