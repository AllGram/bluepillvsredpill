'use strict';

var bodyParser = require('body-parser');

module.exports = function (app) {

	//Parse body
	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended: true
	}));

};