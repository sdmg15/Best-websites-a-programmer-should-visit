'use strict';
const {Readable} = require('stream');

module.exports = input => (
	new Readable({
		read() {
			this.push(input);
			this.push(null);
		}
	})
);
