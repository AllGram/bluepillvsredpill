'use strict';

angular.module('interface')


.controller('FrontpageCtrl', [
	'$scope',
	'StatsService',
	'$rootScope',

	function ($scope, StatsService, $rootScope) {
		$scope.keys = [];
		$scope.selectedkey = '';

		$scope.selectkey = function (key) {
			$scope.selectedkey = key;
			$rootScope.$broadcast('newkey', key);
		};

		$scope.init = function () {

			StatsService.getkeys().then(function (data) {

				if (data) {
					$scope.keys = data;
				}

			}, function () {

			}, function (progress) {

			});
		};

		$scope.init();

	}
]);