var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone Model: Book 
	// and bind it to global variable: app
	app.Book = Backbone.Model.extend({
		defaults: {
			coverImage:   'imgs/backbone.jpg',
			title:        '',
			author:       '',
			releaseDate:  '',
			keywords:     ''
		},

		// when communicating with backend(different unique key)
		// set 'idAttribute' to map(usage: idAttribute: '_id')
		idAttribute: '_id'
	});

})();