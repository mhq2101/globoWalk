import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import GMapArrow from './GMapArrow';
import DayDreamController from './DayDreamController';

const GMapImage = ({ panoImgSrc, mapData }) => {
	if (!mapData) return <h3>Loading</h3>;
	return (
		<Scene>
			<Entity position="0 0 0">
				{/*<Entity primitive="a-camera">
					<Entity primitive="a-cursor" />
				</Entity>*/}
				<DayDreamController />
			</Entity>
			<Entity id="image-360" primitive="a-sky" src={panoImgSrc} />
			{
				mapData.links.map(link => <GMapArrow key={link.pano} linkData={link} headingOffset={mapData.tiles.originHeading} />)
			}
		</Scene>
	);
};

const mapStateToProps = ({ panoImgSrc, mapData }) => ({ panoImgSrc, mapData });

export default connect(mapStateToProps, null)(GMapImage);
