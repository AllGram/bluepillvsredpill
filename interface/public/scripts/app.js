'use strict';

angular.module('interface', ['ngRoute'])

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