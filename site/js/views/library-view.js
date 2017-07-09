var app = app || {};

(function() {
	"use strict";

	app.LibraryView = Backbone.View.extend({
		el: "#books",

		events: {
			"click #add": "addBook"
		},

		initialize: function(initialBooks) {
			this.collection = new app.Library(initialBooks);
			this.listenTo(this.collection, "add", this.renderBook);
			
			this.render();
		},

		render: function() {
			this.collection.each(function(book) {
				this.renderBook(book);
			}, this);
		},

		renderBook: function(book) {
			var bookView = new app.BookView({ model: book });
			this.$el.append(bookView.render().el);
		},

		addBook: function() {
			var book = {};
			$("#addBook div").children("input").each(function(i, el) {
				if($(el).val()) {
                    book[el.id] = $(el).val();  
				}
			});

			this.collection.add(new app.Book(book));
		}
	});
})();

