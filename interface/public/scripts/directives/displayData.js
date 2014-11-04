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
			link: function (scope) {
				scope.$on('noRangeKey', function (event, key) {
					for (var k in key) {
						StatsService.gettime(key[k]).then(function (data) {
								if (data) {
									var thekey = '';
									for (var kee in data) {
										thekey = kee;
									}

									scope.results = {};
									scope.results.name = thekey;
									scope.results.data = [];
									angular.forEach(data[thekey], function (val) {
										var temp = [];
										temp.push(val.timestamp * 1000);
										temp.push(val.execution_time);
										scope.results.data.push(temp);
									});

									scope.$emit('addtotable', scope.results);
								}


							},
							function () {

							}, function () {

							});
					}
				});

				scope.$on('rangeKey', function (event, key) {
					if (key.selectkeys.length) {
						for (var k in key.selectkeys) {
							var rangeobj = {};
							rangeobj.startrange = key.startrange;
							rangeobj.endrange = key.endrange;
							rangeobj.key = key.selectkeys[k];
							StatsService.getrange(rangeobj).then(function (data) {
								if (data) {
									var thekey = '';
									for (var kee in data) {
										thekey = kee;
									}

									scope.results = {};
									scope.results.name = thekey;
									scope.results.data = [];
									angular.forEach(data[thekey], function (val) {
										var temp = [];
										temp.push(val.timestamp * 1000);
										temp.push(val.execution_time);
										scope.results.data.push(temp);
									});

									console.log('add to table', scope.results);
									scope.$emit('addtotable', scope.results);
								}
							}, function () {

							}, function () {

							});
						}
					}
				});
			}
		};
	}
]);