'use strict';

angular.module('interface')

.factory('StatsService', [
	'$http',
	'$q',
	function ($http, $q) {
		return {
			getkeys: function () {

				var deferred = $q.defer();

				$http.get('/getkeys')
					.success(function (data) {
						deferred.resolve(data);
					})
					.error(function (data) {
						deferred.reject(data);
					});


				return deferred.promise;
			},
			gettime: function (key) {

				var deferred = $q.defer();

				$http.get('/gettime/' + key)
					.success(function (data) {
						deferred.resolve(data);
					})
					.error(function (data) {
						deferred.reject(data);
					});

				return deferred.promise;

			},
			getrange: function (key) {
				var deferred = $q.defer();

				$http.get('/getrange/' + key.key + '/from/' + key.startrange + '/to/' + key.endrange)
					.success(function (data) {
						deferred.resolve(data);
					})
					.error(function (data) {
						deferred.reject(data);
					});

				return deferred.promise;
			}
		};
	}
]);