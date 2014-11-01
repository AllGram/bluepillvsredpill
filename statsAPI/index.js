var express = require('express');
var app = express();

var mongoose = require('mongoose');

var router = express.Router();

var mongoConnect = function () {
	mongoose.connect('mongodb://localhost/stats', {
		keepAlive: 1
	});
	console.log('connecting to mongodb');
};

mongoose.connection.on('disconnected', mongoConnect);

mongoConnect();

require('./config/express')(app);

require('./config/routes')(app, router);

app.listen(8000);
console.log('listening on port 8000');