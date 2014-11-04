var esClient = require('../../schemas/models.js').esClient;
var index = 'functionstats';
var type = 'stats';
var _ = require('../../bower_components/underscore/underscore.js');

exports.getKeys = function (req, res) {
	esClient.search({
		"fields": ["key"],
		index: index,
		type: type,
		body: {
			"query": {
				"match_all": {}
			}
		}
	}, function (err, results) {
		if (err) {
			console.log('An error occurred while calling getKeys', err);
			return;
		}

		var retarray = [];
		var retobj = {};
		_.each(results.hits.hits, function (value, i) {
			retarray.push(value.fields.key);
		});

		retarray = _.uniq(retarray);

		_.each(retarray, function (value, i) {
			retobj['key' + i] = value;
		});

		res.json(retobj);
	});
};

exports.getTime = function (req, res) {
	var key = req.params.key;
	esClient.search({
		index: index,
		type: type,
		body: {
			"query": {
				"match": {
					"key": key
				}
			},
			"sort": {
				"timestamp": {
					"order": "asc"
				}
			}
		}
	}, function (err, results) {
		if (err) {
			console.log('An error occurred while calling getTime', err);
			return;
		}

		var allResults = {};
		allResults[key] = [];

		_.each(results.hits.hits, function (result, i) {
			tmp = {
				"execution_time": result._source.execution_time,
				"timestamp": result._source.timestamp
			};

			allResults[key].push(tmp);
		});

		res.json(allResults);
	});
};

exports.getTimeInRange = function (req, res) {
	var key = req.params.key;
	var range = (req.query.range).split('-');
	var start = parseFloat(range[0]);
	var end = parseFloat(range[1]);

	esClient.search({
		index: index,
		type: type,
		body: {
			"query": {
				"filtered": {
					"query": {
						"match": {
							"key": key
						}
					},
					"filter": {
						"range": {
							"timestamp": {
								"from": start,
								"to": end
							}
						}
					}
				}
			},
			"sort": {
				"timestamp": {
					"order": "asc"
				}
			}
		}
	}, function (err, results) {
		if (err) {
			console.log('An error occurred while calling getTimeInRange', err);
			return;
		}
		var allResults = {};
		allResults[key] = [];

		_.each(results.hits.hits, function (result, i) {
			tmp = {
				"execution_time": result._source.execution_time,
				"timestamp": result._source.timestamp
			};

			allResults[key].push(tmp);
		});

		res.json(allResults);
	});
};