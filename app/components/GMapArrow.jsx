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
		return (
			<Entity events={{
				click: this.handleClick
			}} primitive="a-box" position={`${3 * Math.cos(linkData.heading)}, 0, ${3 * Math.sin(linkData.heading)}`} roation="0 45 0" color="#4CC3D9" />
		);
	}
}

const mapDispatchToProps = { setCurrentPanoId };

export default connect(null, mapDispatchToProps)(GMapArrow);
