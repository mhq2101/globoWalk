export default function createClickHandler(handler) {
	const absComp = {
		schema: { default: '' },
		init: function () {
			this.handler = this.handler.bind(this);
			const data = this.data;
			this.el.addEventListener('click', function () {
				console.log(handler);
			});
		}
	};

	return absComp;
}
