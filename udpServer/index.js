var dgram = require('dgram');
var FunctionStats = require('./models.js').FunctionStats;
var mongoose = require('mongoose');
var server = dgram.createSocket('udp4');

var mongoConnect = function () {
	mongoose.connect('mongodb://localhost/stats', {
		keepAlive: 1
	});
	console.log('connecting to mongodb');
};

mongoose.connection.on('disconnected', mongoConnect);

mongoConnect();

server.on('message', function (msg, rinfo) {
	console.log('got message from client: ' + msg);

	var data = JSON.parse(msg);

	var functionStats = new FunctionStats(data);

	functionStats.save(function (err, stats) {
		if (err) {
			console.log('Error while saving, possibly some empty fields');
			return;
		}
		console.log('functionStats successfully saved', stats);

	});
});

server.on('listening', function () {
	console.log('Kodemon server listening on');
	console.log('hostname: ' + server.address().address);
	console.log('port: ' + server.address().port);
});

server.bind(4000);