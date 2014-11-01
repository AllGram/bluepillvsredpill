var mongoose = require('mongoose');

var functionStatsSchema = new mongoose.Schema({

	'execution_time': {
		type: Number,
		required: true
	},
	'timestamp': {
		type: Date,
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
	'FunctionStats': FunctionStats
};