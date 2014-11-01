module.exports = function (app, router) {

	// User views
	var index = require('../controllers/index');

	router.get('/', index.index);

	router.get('/getkeys', index.getkeys);

	router.get('/gettime/:key', index.gettime);

	router.get('/partials/:partial', index.partials);

	router.get('*', index.index);

	// Add the router to the app
	app.use('/', router);
};