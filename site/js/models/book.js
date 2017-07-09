var app = app || {};

(function() {
	"use strict";

	app.Book = Backbone.Model.extend({
		defaults: {
			coverImage:   "imgs/backbone.jpg",
			title:        "",
			author:       "",
			releaseDate:  "",
			keywords:     "" 
		}
	});
})();