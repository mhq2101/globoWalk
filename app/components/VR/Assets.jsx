import 'aframe';
import React from 'react';

const Assets = props => {
	const { controls } = props;

	return (
		<a-assets>
			{
				controls.map(control => <img key={`${control.id}img`} id={`${control.id}img`} src={control.src} />)
			}
		</a-assets>
	);
};

export default Assets;
