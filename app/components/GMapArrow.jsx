import 'aframe';
import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import { setCurrentPanoId } from '../redux/reducers/panoId';

class GMapArrow extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		//console.log("I've been clicked!!!");
		this.props.setCurrentPanoId(this.props.linkData.pano);
	}

	render() {
		const linkData = this.props.linkData;
		linkData.heading -= this.props.headingOffset + 90;
		linkData.heading *= (Math.PI / 180);
		console.log('heading', linkData.heading);
		console.log('sin', Math.sin(linkData.heading));
		console.log('cos', Math.cos(linkData.heading));

		return (
			<Entity events={{
				click: this.handleClick
			}} primitive="a-sphere" scale="0.4 0.4 0.4" position={`${8 * Math.sin(linkData.heading)}, 0, ${8 * Math.cos(linkData.heading)}`} color="#4CC3D9" />
		);
	}
}

const mapDispatchToProps = { setCurrentPanoId };

export default connect(null, mapDispatchToProps)(GMapArrow);
