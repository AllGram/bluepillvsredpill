var FunctionStats = require('../../schemas/models.js').FunctionStats;
var _ = require('../../bower_components/underscore/underscore.js');

exports.getKeys = function (req, res) {
	FunctionStats.distinct('key', function (err, results) {

		if (err) {
			console.log('An error occurred while calling getKeys');
			return;
		}

		var keys = {};

		_.each(results, function (result, i) {
			keys['key' + i] = result;
		});

		res.json(keys);
	});
};

exports.getTime = function (req, res) {
	FunctionStats.find({
		'key': req.params.key
	}, '-_id execution_time timestamp', function (err, results) {

		if (err) {
			console.log('An error occurred while calling getTime');
			return;
		}

		var times = {};

		times[req.params.key] = results;

		res.json(times);
	});
};

exports.getTimeInRange = function (req, res) {
	var key = req.params.key;
	var range = (req.query.range).split('-');
	var start = parseFloat(range[0]);
	var end = parseFloat(range[1]);

	FunctionStats.find({
		'key': key,
		'execution_time': {
			$gte: start,
			$lte: end
		}

	}, '-_id execution_time', function (err, results) {

		if (err) {
			console.log('An error occurred while calling getTimeInRange');
			return;
		}

		res.send(results);

	});
};