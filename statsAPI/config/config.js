var nconf = require('nconf');
var path = require('path');

var env = process.env.NODE_ENV || 'development';

var rootPath = path.resolve(__dirname + '/../');

nconf
	.argv()
	.env()
	.file(__dirname + '/env/' + env + '.json')
	.defaults({
		env: process.env.NODE_ENV,
		root: rootPath
	});


module.exports = nconf.get();