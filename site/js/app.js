var app = app || {};

$(function() {
	// var books = [
	// 	{ title: "Book1", author: "Author1", releaseDate: "2000", keywords: "key"},
	// 	{ title: "Book2", author: "Author2", releaseDate: "2000", keywords: "key"},
	// 	{ title: "Book3", author: "Author3", releaseDate: "2000", keywords: "key"}
	// ];

	// $('#releaseDate').datepicker();
	new app.LibraryView(books);
});