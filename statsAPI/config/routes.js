'use strict';

module.exports = function (app, router) {

	var statistics = require('../endpoints/statistics/index');

	router.get('/api/getkeys', statistics.getKeys);

	router.get('/api/gettime/:key', statistics.getTime);

	router.get('/api/gettimeinrange/:key', statistics.getTimeInRange);

	// Add the router to the app
	app.use('/', router);

};