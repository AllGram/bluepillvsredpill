'use strict';

var StatsService = require('../config/StatsService');
var bodyparser = require('body-parser');

exports.index = function (req, res) {
	res.render('index');
};

exports.partials = function (req, res) {
	res.render('partials/' + req.params.partial);
};

exports.getkeys = function (req, res) {

	StatsService.getkeys(function (err, keys) {
		if (err) {
			return res.send(400, err);
		}

		return res.json(keys);
	});

};

exports.gettime = function (req, res) {

	StatsService.gettime(req.params.key, function (err, keys) {
		if (err) {
			return res.send(400, err);
		}

		return res.json(keys);
	});

};