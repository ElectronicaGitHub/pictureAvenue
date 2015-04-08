$ = require('jquery');

openConnects = function() {
	$(document).on('globalEvent', function(event, data) {
		$(document).trigger(data.group, data);
	})
}

module.exports = openConnects;