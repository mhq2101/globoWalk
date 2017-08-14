import 'aframe';
import React from 'react';
import { Entity, Scene } from 'aframe-react';
import panoLoad from 'google-panorama-equirectangular';
import panoData from 'google-panorama-by-id';
const panoId = 'dXZfBMex9_L7jO2JW3FTdA';

export default class AframeTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = { canvToImg: undefined };
	}

	componentWillMount() {
		panoData(panoId, (err, result) => {
			if (err) console.error(err);
			console.log('result', result);
			panoLoad(panoId, {
				tiles: result.tiles,
				zoom: 3,
				crossOrigin: 'Anonymous'
			})
				.on('complete', image => {
					let canvToImg = convertCanvasToImage(image);
					this.setState({ canvToImg });
				});
		});
	}

	render() {
		if (!this.state.canvToImg) return <h1>Loading</h1>;
		return (
			<Scene vr-mode-ui="enabled: true;">
				<a-assets>
					<img id="panorama" src={this.state.canvToImg.src} />
				</a-assets>
				<Entity primitive="a-sky" src="#panorama" />
			</Scene>);
	}
}

function convertCanvasToImage(canvas) {
	let img = new Image();
	img.setAttribute('crossOrigin', 'Anonymous');
	img.src = canvas.toDataURL('image/jpeg');
	return img;
}
