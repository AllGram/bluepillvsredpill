'use strict';

angular.module('interface', ['ngRoute', 'ui.bootstrap.datetimepicker', 'highcharts-ng'])

.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/frontpage'
			})
			.when('/frontpage', {
				templateUrl: '/partials/frontpage',
				controller: 'FrontpageCtrl'
			})
			.otherwise({
				redirectTo: '/frontpage'
			});

		$locationProvider.html5Mode(true);
	}
]);