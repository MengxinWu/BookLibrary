var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone View: BookView
	// and bind it to global variable: app
	app.BookView = Backbone.View.extend({
		tagName: 'div',
		className: 'bookContainer',
		template: _.template($('#bookTemplate').html()),

		events: {
			// click...
			'click .delete': 'deleteBook'
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		deleteBook: function() {

			// destroy model
			this.model.destroy();

			// remove view
			this.remove();
		}
	});
	
})();