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
			gettimes: function (key) {

				var deferred = $q.defer();

				$http.get('/gettime/' + key)
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