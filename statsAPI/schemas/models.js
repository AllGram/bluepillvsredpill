var es = require('elasticsearch');
var mongoose = require('mongoose');

var esClient = new es.Client({
	host: 'http://localhost:9200'
})

var functionStatsSchema = new mongoose.Schema({

	'execution_time': {
		type: Number,
		required: true
	},
	'timestamp': {
		type: Number,
		required: true
	},
	'token': {
		type: String,
		required: true
	},
	'key': {
		type: String,
		required: true
	}

});

var FunctionStats = mongoose.model('FunctionStats', functionStatsSchema);

module.exports = {
	'FunctionStats': FunctionStats,
	'esClient': esClient
};