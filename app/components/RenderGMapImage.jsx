import React from 'react';
import panoLoad from 'google-panorama-equirectangular';
import panoData from 'google-panorama-by-id';
import { connect } from 'react-redux';

import GMapImage from './GMapImage';
import { setCurrentPanoImgSrc } from '../redux/reducers/panoImgSrc';
import { setCurrentMapData } from '../redux/reducers/mapData';

class RenderGMapImage extends React.Component {
	constructor(props) {
		super(props);

		this.getPanoramaData = this.getPanoramaData.bind(this);
	}

	componentWillMount() {
		this.getPanoramaData(this.props.panoId);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.panoId !== newProps.panoId) {
			this.getPanoramaData(newProps.panoId);
		}
	}

	getPanoramaData(panoId) {
		panoData(panoId, (err, mapData) => {
			if (err) console.error(err);
			this.props.setCurrentMapData(mapData);
			panoLoad(panoId, {
				tiles: mapData.tiles,
				zoom: 3,
				crossOrigin: 'Anonymous'
			})
				.on('complete', canvas => {
					const panoImg = canvas.toDataURL('image/jpeg');
					this.props.setCurrentPanoImgSrc(panoImg);
				});
		});
	}

	render() {
		if (!this.props.panoImgSrc) return <h1>Loading</h1>;
		return (<GMapImage />);
	}
}

const mapStateToProps = ({ panoId, panoImgSrc }) => ({ panoId, panoImgSrc });

const mapDispatchToProps = function(dispatch){
	return {
		setCurrentPanoImgSrc(imgSrc){
			dispatch(setCurrentPanoImgSrc(imgSrc));
		},
		setCurrentMapData(data){
			dispatch(setCurrentMapData(data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderGMapImage);
