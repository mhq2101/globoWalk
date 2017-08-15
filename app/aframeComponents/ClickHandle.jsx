import AFRAME from 'aframe';
import createClickHandler from './createClickHandler';

const handler = function(evt) {
	const handleClick = this.data;
	console.log(handleClick);
};
const clickHandler = createClickHandler(handler);

export default AFRAME.registerComponent('clickhandle', clickHandler);
