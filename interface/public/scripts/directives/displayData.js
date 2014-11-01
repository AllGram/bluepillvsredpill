'use strict';

angular.module('interface')


.directive('displayData', [
	'StatsService',

	function (StatsService) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/displayData.html',
			scope: {

			},
			link: function (scope, elem, attrs) {
				scope.$on('newkey', function (event, key) {
					StatsService.gettimes(key).then(function (data) {

							if (data) {
								scope.times = data;
							}


						},
						function () {

						}, function (progress) {

						});
				});
			}
		};
	}
]);