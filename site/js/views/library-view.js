var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// defien Backbone View: LibraryView
	// and bind it to global variable: app
	app.LibraryView = Backbone.View.extend({
		el: '#books',

		events: {
			'click #add': 'addBook'
		},

		initialize: function() {
			this.collection = new app.Library();

			//... 
			this.collection.fetch();
			this.render();

			this.listenTo(this.collection, 'add', this.renderBook);
			this.listenTo(this.collection, 'reset', this.render);
		},

		render: function() {
			this.collection.each(function(book) {
				this.renderBook(book);
			}, this);
		},

		renderBook: function(book) {
			var bookView = new app.BookView({model: book});
			this.$el.append(bookView.render().el);
		},

		addBook: function() {
			var book = {};
			$('#addBook div').children('input').each(function(i, el) {
				if( $( el ).val() != "" )
				{
					if( el.id === 'keywords' ) {
						book[el.id] = [];
						_.each($(el).val().split( ' ' ), function(keyword) {
							book[el.id].push({'keyword': keyword});
						});
					} else if(el.id === 'releaseDate') {
						// book[el.id] = $('#releaseDate').datepicker('getDate').getTime();
					} else {
						book[el.id] = $(el).val();
					}
				}
			});

			// call collection.create() ...
			this.collection.create(book);
		}
	});
})();

