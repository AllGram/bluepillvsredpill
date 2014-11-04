var http = require('http');
var jquery = require('../../public/bower_components/jquery/dist/jquery.js');

exports.getkeys = function (callback) {

	var url = 'http://localhost:8000/api/getkeys';

	http.get(url, function (resp) {
		var data = '';

		resp.on('data', function (chunk) {
			data += chunk;
		});

		resp.on('end', function () {

			data = JSON.parse(data);

			return callback(null, data);
		});


	}).on('error', function (err) {
		return callback(err);
	});
};

exports.gettime = function (key, callback) {

	var url = 'http://localhost:8000/api/gettime/' + key;

	http.get(url, function (resp) {
		var data = '';

		resp.on('data', function (chunk) {
			data += chunk;
		});

		resp.on('end', function () {

			data = JSON.parse(data);

			return callback(null, data);
		});


	}).on('error', function (err) {
		return callback(err);
	});
};

exports.getrange = function (key, callback) {

	var url = 'http://localhost:8000/api/gettimeinrange/' + key.key + '/?range=' + key.from + '-' + key.to;

	http.get(url, function (resp) {
		var data = '';

		resp.on('data', function (chunk) {
			data += chunk;
		});

		resp.on('end', function () {

			console.log(data);

			data = JSON.parse(data);

			return callback(null, data);
		});


	}).on('error', function (err) {
		return callback(err);
	});
};