/* eslint id-length: 0 */
import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';

import LocationTile from './LocationTile';

const MoveLocations = props => {
	const { locations, showOrHideMenu } = props;

	return (
		<Entity>
			{
				locations.map((location, index) => <LocationTile key={location.name} location={location} index={index} showOrHideMenu={showOrHideMenu} />)
			}
		</Entity>
	);
};

export default MoveLocations;
