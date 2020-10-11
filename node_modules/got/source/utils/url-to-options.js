'use strict';
const is = require('@sindresorhus/is');

module.exports = url => {
	const options = {
		protocol: url.protocol,
		hostname: url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
		hash: url.hash,
		search: url.search,
		pathname: url.pathname,
		href: url.href
	};

	if (is.string(url.port) && url.port.length > 0) {
		options.port = Number(url.port);
	}

	if (url.username || url.password) {
		options.auth = `${url.username}:${url.password}`;
	}

	options.path = is.null(url.search) ? url.pathname : `${url.pathname}${url.search}`;

	return options;
};
