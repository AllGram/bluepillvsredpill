angular.module('interface')


.controller('FrontpageCtrl', [
	'$scope',
	'StatsService',
	'$rootScope',
	'$interval',
	function ($scope, StatsService, $rootScope, $interval) {
		$scope.keys = [];
		$scope.selectkeys = [];
		$scope.keysnotempty = false;
		$scope.rangeset = false;
		$scope.startrange = '';
		$scope.endrange = '';
		$scope.rangekeys = {
			selectkeys: '',
			startrange: '',
			endrange: ''
		};
		$scope.selected = [];
		$scope.selectClass = function (index) {
			$scope.selected[index] = !$scope.selected[index];
		};

		var mainInterval = $interval(function () {
			if ($scope.rangeset) {
				console.log('range');
				$scope.$broadcast('rangeKey', $scope.rangekeys);
			} else {
				console.log('NOrange');
				$scope.$broadcast('noRangeKey', $scope.selectkeys);
			}
		}, 1000);

		$scope.selectkey = function (key) {
			var inarray = $scope.selectkeys.indexOf(key);
			if (inarray !== -1) {
				$scope.selectkeys.splice(inarray, 1);
				$scope.rangekeys.selectkeys = $scope.selectkeys;
				for (var k in $scope.chartConfig.series) {
					if ($scope.chartConfig.series[k].name === key) {
						$scope.chartConfig.series.splice(k, 1);
					}
				}

				if (!$scope.selectkeys.length) {
					$scope.keysnotempty = false;
				}
			} else {
				$scope.selectkeys.push(key);
				$scope.rangekeys.selectkeys = $scope.selectkeys;

				$scope.keysnotempty = true;
			}
		};

		$scope.$watch('[startrange, endrange]', function () {
			var dateStart = new Date($scope.startrange);
			var dateEnd = new Date($scope.endrange);
			$scope.epochstart = dateStart.getTime() / 1000.0;
			$scope.epochend = dateEnd.getTime() / 1000.0;

			if ($scope.startrange) {
				$scope.showstart = dateStart.toDateString() + ' ' + dateStart.toLocaleTimeString();
			}
			if ($scope.endrange) {
				$scope.showend = dateEnd.toDateString() + ' ' + dateEnd.toLocaleTimeString();
			}

			if ($scope.startrange && $scope.endrange) {
				$scope.rangeset = true;
				$scope.rangekeys.startrange = $scope.epochstart;
				$scope.rangekeys.endrange = $scope.epochend;
			}
		});

		$scope.clearrange = function () {
			$scope.startrange = '';
			$scope.endrange = '';
			$scope.epochstart = '';
			$scope.epochend = '';
			$scope.showstart = '';
			$scope.showend = '';
			$scope.rangeset = false;
		};

		$scope.chartConfig = {
			options: {
				chart: {
					type: 'line'
				}
			},
			series: [],
			title: {
				text: 'Function running times'
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%b %e, %Y'
				}
			},
			loading: false
		};

		$scope.$on('addtotable', function (event, val) {
			var found = false;

			for (var k in $scope.chartConfig.series) {
				if ($scope.chartConfig.series[k].name === val.name) {
					found = true;
					$scope.chartConfig.series[k].data = val.data;
				}
			}

			if (!found) {
				$scope.chartConfig.series.push(val);
			}
		});

		var init = function () {
			StatsService.getkeys().then(function (data) {
				if (data) {
					$scope.keys = data;
					for (var i = 0; i < Object.keys(data).length; i++) {
						$scope.selected.push(0);
					}
				}
			}, function () {

			}, function () {

			});
		};
		init();
	}
]);