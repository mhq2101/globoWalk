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

		const arrowX = 5 * Math.sin(linkData.heading);
		const arrowZ = 5 * Math.cos(linkData.heading);

		return (
			<Entity
				className="selectable"
				events={{
					click: this.handleClick,
					buttonup: this.handleClick
				}}
				primitive="a-sphere"
				scale="0.15 0.15 0.15"
				position={`${arrowX}, 1, ${arrowZ}`}
				color="#4CC3D9"
			/>
		);
	}
}

const mapDispatchToProps = { setCurrentPanoId };

export default connect(null, mapDispatchToProps)(GMapArrow);
