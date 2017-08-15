import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';

import { setCurrentPanoId } from '../redux/reducers/panoId';

class GMapImage extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		//console.log("I've been clicked!!!");
		this.props.setCurrentPanoId('zp18ehA20-QAAAQzzZyilA');
	}

	render() {
		return (
			<Scene>
				<a-assets>
					<img id="panorama" crossOrigin="anonymous" src={this.props.panoImgSrc} />
				</a-assets>
				<Entity id="image-360" primitive="a-sky" src={this.props.panoImgSrc} />
				<Entity id="click-box" events={{
					click: this.handleClick
				}} primitive="a-box" position="1, -1.5, -3" roation="0 45 0" color="#4CC3D9" />
				<a-camera>
					<a-cursor />
				</a-camera>
			</Scene>
		);
	}
}

const mapStateToProps = ({ panoImgSrc }) => ({ panoImgSrc });

const mapDispatchToProps = { setCurrentPanoId };

export default connect(mapStateToProps, mapDispatchToProps)(GMapImage);
