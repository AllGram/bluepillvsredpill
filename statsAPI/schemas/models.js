var es = require('elasticsearch');

var esClient = new es.Client({
	host: 'http://localhost:9200'
})

module.exports = {
	'esClient': esClient
};