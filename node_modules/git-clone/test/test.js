var gitClone = require('../index');

gitClone('git@github.com:jaz303/tpl-simple-site.git', './test-checkout', {
	checkout: 'a76362b0705d4126fa4462916cabb2506ecfe8e2' },
	function(err) {
		console.log("complete!");
		console.log(err);
	});
