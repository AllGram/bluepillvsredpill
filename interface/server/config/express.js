var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

module.exports = function (app) {

	//Parse body
	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// Set public as a static directory
	app.use(express.static(config.root + 'public'));
	app.use(express.static(config.root + 'public/bower_components'));

	// Use jade as a template engine
	app.engine('jade', require('jade').__express);

	// Set views directory
	app.set('views', config.root + 'server/views');

	// Let express know that the extensions for the views are .jade
	app.set('view engine', 'jade');

};