export default function createClickHandler(handler) {
	const absComp = {
		schema: { default: '' },

		init: function () {
			this.handler = this.handler.bind(this);
			const data = this.data;
			this.el.addEventListener('click', this.handler);
		},

		handler: function() {
			console.log("Abstract component handler fired.");
		}
	};

	absComp.handler = handler;

	return absComp;
}
