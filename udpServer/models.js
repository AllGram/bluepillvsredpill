var mongoose = require('mongoose');
var es = require('elasticsearch');

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

functionStatsSchema.post('save', function(data) {
	esClient.index({
	index: 'functionstats',
	type: 'stats',
	id: String(data._id),
	body: data}, 
	function (err, res) {
		if (err) {
			console.log(err);
		}
		console.log('from elasticsearch: ', res);
	});
});

var FunctionStats = mongoose.model('FunctionStats', functionStatsSchema);

module.exports = {
	'FunctionStats': FunctionStats
};