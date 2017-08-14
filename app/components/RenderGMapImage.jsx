import React from 'react';
import panoLoad from 'google-panorama-equirectangular';
import panoData from 'google-panorama-by-id';
import { connect } from 'react-redux';

import GMapImage from './GMapImage';

class AframeTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			panoImgSrc: undefined,
			mapData: {}
		};
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
			panoLoad(panoId, {
				tiles: mapData.tiles,
				zoom: 3,
				crossOrigin: 'Anonymous'
			})
				.on('complete', canvas => {
					let panoImgSrc = canvas.toDataURL('image/jpeg');
					this.setState({ panoImgSrc, mapData });
				});
		});
	}

	render() {
		if (!this.state.panoImgSrc) return <h1>Loading</h1>;
		return (
			<GMapImage panoImgSrc={this.state.panoImgSrc} mapData={this.state.mapData} />);
	}
}

const mapStateToProps = state => ({ panoId: state.panoId });

export default connect(mapStateToProps)(AframeTest);
