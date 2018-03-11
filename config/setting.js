module.exports = function(){
	// get modules
	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var path = require('path');

	// template engine, body-parser, static file path settings
	app.set('views',path.join(__dirname,'../views'));
	app.set('view engine', 'ejs');
	app.use(express.static(path.join(__dirname,'../public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

	// back button login information control
	app.use(function(req, res, next) {
		res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		next();
	});
	return app;
}

