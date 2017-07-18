var application_root = __dirname,
	express = require("express"),
	path = require("path"),
	mongoose = require("mongoose");

var app = express();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "site")));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

var port = 4711;
app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});


// connect to database: MongoDB
mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
	keyword: String
});

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [Keywords]
});

var BookModel = mongoose.model('Book', Book);


// routes
app.get("/api", function(request, response) {
	response.send("Library API is running.");
});

// HTTP GET '/api/books': get a list of all books
// example: enter in console:
// $.get('/api/books',function(data,textStatus,jqXHR){console.log(data,textStatus,jqXHR)});
app.get('/api/books', function(request, response) {
	return BookModel.find(function(err, books) {
		if(!err) {
			return response.send(books);
		} else {
			return console.log(err);
		}
	});
});

// HTTP POST '/api/books': add a new book
// example: enter in console:
// $.post('/api/books',{'title':'js','author':'DC','releaseDate':new Date(2008,4,1).getTime()},function(data,textStatus,jqXHR){console.log(data,textStatus,jqXHR)});
app.post('/api/books', function(request, response) {
	var book = new BookModel({
		title:       request.body.title,
		author:      request.body.author,
		releaseDate: request.body.releaseDate,
		keywords:    request.body.keywords
	});
	book.save(function(err) {
		if(!err) {
			return console.log('\n<----- add a book. ----->\n');
		} else {
			return console.log(err);
		}
		return response.send(book);
	});
});

// HTTP GET '/api/books/:id': get a single book by id
app.get('/api/books/:id', function(request, response) {
	return BookModel.findById(request.params.id, function(err, book) {
		if(!err) {
			return response.send(book);
		} else {
			return console.log(err);
		}
	});
});

// update a book
app.put('/api/books/:id', function(request, response) {
	return BookModel.findById(request.params.id, function(err, book) {
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;
		book.keywords = request.body.keywords;

		return book.save(function(err) {
			if(!err) {
				console.log('\n<----- update a book. ----->\n');
			} else {
				console.log(err);
			}
			return response.send(book);
		});
	});
});

// delete a book
app.delete('/api/books/:id', function(request, response) {
	return BookModel.findById(request.params.id, function(err, book) {
		return book.remove(function(err) {
			if(!err) {
				console.log('\n<----- delete a book. ----->\n');
			} else {
				console.log(err);
			}
		});
	});
});