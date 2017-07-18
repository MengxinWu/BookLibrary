var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone Collection: Library
	// and bind it to global variable: app
	app.Library = Backbone.Collection.extend({
		model: app.Book,

		// set 'url' to reference its location on the server
		url: '/api/books'
	});
	
})();