'use strict';
const urlLib = require('url');
const http = require('http');
const PCancelable = require('p-cancelable');
const is = require('@sindresorhus/is');

class GotError extends Error {
	constructor(message, error, options) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.name = 'GotError';

		if (!is.undefined(error.code)) {
			this.code = error.code;
		}

		Object.assign(this, {
			host: options.host,
			hostname: options.hostname,
			method: options.method,
			path: options.path,
			socketPath: options.socketPath,
			protocol: options.protocol,
			url: options.href,
			gotOptions: options
		});
	}
}

module.exports.GotError = GotError;

module.exports.CacheError = class extends GotError {
	constructor(error, options) {
		super(error.message, error, options);
		this.name = 'CacheError';
	}
};

module.exports.RequestError = class extends GotError {
	constructor(error, options) {
		super(error.message, error, options);
		this.name = 'RequestError';
	}
};

module.exports.ReadError = class extends GotError {
	constructor(error, options) {
		super(error.message, error, options);
		this.name = 'ReadError';
	}
};

module.exports.ParseError = class extends GotError {
	constructor(error, statusCode, options, data) {
		super(`${error.message} in "${urlLib.format(options)}": \n${data.slice(0, 77)}...`, error, options);
		this.name = 'ParseError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
	}
};

module.exports.HTTPError = class extends GotError {
	constructor(response, options) {
		const {statusCode} = response;
		let {statusMessage} = response;

		if (statusMessage) {
			statusMessage = statusMessage.replace(/\r?\n/g, ' ').trim();
		} else {
			statusMessage = http.STATUS_CODES[statusCode];
		}

		super(`Response code ${statusCode} (${statusMessage})`, {}, options);
		this.name = 'HTTPError';
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.headers = response.headers;
		this.body = response.body;
	}
};

module.exports.MaxRedirectsError = class extends GotError {
	constructor(statusCode, redirectUrls, options) {
		super('Redirected 10 times. Aborting.', {}, options);
		this.name = 'MaxRedirectsError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
		this.redirectUrls = redirectUrls;
	}
};

module.exports.UnsupportedProtocolError = class extends GotError {
	constructor(options) {
		super(`Unsupported protocol "${options.protocol}"`, {}, options);
		this.name = 'UnsupportedProtocolError';
	}
};

module.exports.TimeoutError = class extends GotError {
	constructor(error, options) {
		super(error.message, {code: 'ETIMEDOUT'}, options);
		this.name = 'TimeoutError';
		this.event = error.event;
	}
};

module.exports.CancelError = PCancelable.CancelError;
