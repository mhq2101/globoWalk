import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import GMapArrow from './GMapArrow';

const GMapImage = ({ panoImgSrc, mapData }) => {
	if (!mapData) return <h3>Loading</h3>;
	return (
		<Scene>
			<a-assets>
				<img id="panorama" crossOrigin="anonymous" src={panoImgSrc} />
			</a-assets>
			<Entity id="image-360" primitive="a-sky" src={panoImgSrc} />
			{
				mapData.links.map(link => <GMapArrow key={link.pano} linkData={link} headingOffset={mapData.tiles.originHeading} />)
			}
			<a-camera>
				<a-cursor />
			</a-camera>
		</Scene>
	);
};

const mapStateToProps = ({ panoImgSrc, mapData }) => ({ panoImgSrc, mapData });

export default connect(mapStateToProps, null)(GMapImage);
