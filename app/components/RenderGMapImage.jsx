import React from 'react';
import getPanoImg from 'google-panorama-equirectangular';
import getPanoDataId from 'google-panorama-by-id';
import getPanoDataLoc from 'google-panorama-by-location';
import { connect } from 'react-redux';

import GMapImage from './GMapImage';
import { setCurrentPanoImgSrc } from '../redux/reducers/panoImgSrc';
import { setCurrentMapData } from '../redux/reducers/mapData';

class RenderGMapImage extends React.Component {
	constructor(props) {
		super(props);

		this.getPanoramaData = this.getPanoramaData.bind(this);
		this.loadPanoramaData = this.loadPanoramaData.bind(this);
	}

	componentWillMount() {
		if (this.props.panoId) {
			this.getPanoramaData(this.props.panoId);
		}
	}

	componentWillReceiveProps(newProps) {
		if (this.props.panoId !== newProps.panoId) {
			this.getPanoramaData(newProps.panoId);
		}
	}

	getPanoramaData(panoId) {
		if (typeof panoId === 'string') {
			getPanoDataId(panoId, (err, mapData) => {
				if (err) console.error(err);
				this.props.setCurrentMapData(mapData);
				this.loadPanoramaData(panoId);
			});
		}
		else {
			getPanoDataLoc(panoId, (err, mapData) => {
				if (err) console.error(err);
				this.props.setCurrentMapData(mapData);
				this.loadPanoramaData(mapData.id);
			});
		}
	}

	loadPanoramaData(panoId) {
		getPanoImg(panoId, {
			tiles: this.props.mapData.tiles,
			zoom: 3,
			crossOrigin: 'Anonymous'
		})
			.on('complete', canvas => {
				const panoImg = canvas.toDataURL('image/jpeg');
				this.props.setCurrentPanoImgSrc(panoImg);
			});
	}

	render() {
		return (<GMapImage />);
	}
}

const mapStateToProps = ({ panoId, mapData }) => ({ panoId, mapData });

const mapDispatchToProps = function (dispatch) {
	return {
		setCurrentPanoImgSrc(imgSrc) {
			dispatch(setCurrentPanoImgSrc(imgSrc));
		},
		setCurrentMapData(data) {
			dispatch(setCurrentMapData(data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderGMapImage);
