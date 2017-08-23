/* eslint id-length: 0 */
import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import { setCurrentPanoId } from '../../redux/reducers/panoId';

const LocationTile = props => {
	const { location, index } = props;

	const scale = 0.95;
	const spacing = scale * 0.1;
	const rowSize = 4;

	const xOffset = scale + spacing;
	const startX = -((xOffset * rowSize) / 2) + spacing / 2;
	const currX = startX + xOffset * (index % rowSize);

	const startY = 3;
	const yOffset = Math.floor(index / rowSize);
	const currY = startY - yOffset - (yOffset * spacing);

	const loc = location.coords.join(',');
	const locStr = `https://maps.googleapis.com/maps/api/streetview?size=128x128&location=${loc}&fov=90&key=AIzaSyC_F8hIJwY292vEpTiLEdyQzZY2OK7j6FM`;

	return (
		<Entity
			id={location.name}
			className={'arrows'}
			primitive={'a-plane'}
			src={locStr}
			transparent={false}
			scale={{ x: scale, y: scale, z: scale }}
			position={{ x: currX, y: currY, z: -4.5 }}
			events={{
				click: () => {
					props.setCurrentPanoId(location.coords);
					props.showOrHideMenu();
				}
			}}
		>
			<Entity
				text={{
					align: 'left',
					color: 'black',
					font: 'roboto',
					value: location.name,
					width: scale + (2 * spacing) / 3,
					wrapCount: 10
				}}
				position={{ x: 0.042, y: 0.012, z: 0 }}
			/>
			<Entity
				text={{
					align: 'left',
					color: 'white',
					font: 'roboto',
					value: location.name,
					width: scale + (2 * spacing) / 3,
					wrapCount: 10,
					zOffset: 0.002
				}}
				position={{ x: 0.03, y: 0, z: 0 }}
			/>
		</Entity>
	);
};

const mapDispatchToProps = function (dispatch) {
	return {
		setCurrentPanoId(panoId) {
			dispatch(setCurrentPanoId(panoId));
		}
	};
};

export default connect(null, mapDispatchToProps)(LocationTile);
