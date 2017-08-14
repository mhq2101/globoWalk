import React from 'react';
import panoLoad from 'google-panorama-equirectangular';
import panoData from 'google-panorama-by-id';
import { connect } from 'react-redux';

import GMapImage from './GMapImage';

class AframeTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canvToImg: undefined,
			mapData: {}
		};
		this.getPanoramaData = this.getPanoramaData.bind(this);
	}

	componentWillMount() {
		this.getPanoramaData(this.props.panoId);
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
					let canvToImg = canvas.toDataURL('image/jpeg');
					this.setState({ canvToImg, mapData });
				});
		});
	}

	render() {
		if (!this.state.canvToImg) return <h1>Loading</h1>;
		return (
			<GMapImage canvToImg={this.state.canvToImg} mapData={this.state.mapData} />);
	}
}

const mapStateToProps = state => ({ panoId: state.panoId });

export default connect(mapStateToProps)(AframeTest);
