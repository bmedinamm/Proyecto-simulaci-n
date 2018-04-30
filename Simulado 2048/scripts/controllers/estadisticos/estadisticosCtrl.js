'use strict';
angular.module('2048Simulator')
.controller('estadisticosCtrl', ['$scope', '$location', function($scope, $location){
	
	
	$scope.labels = ['Heuristica 1', 'Heuristica 2', 'Heuristica 3', 'Heuristica 4'];
	$scope.series = ['Porcentaje ganado ', 'Porcentaje perdido '];

	$scope.data = [
		[65, 59, 80, 81],
		[28, 48, 40, 19]
	];

	$scope.labelsGrafico2 = ["8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
	$scope.seriesGrafico2 = ['Series A'];
	$scope.dataGrafico2 = [[65, 59, 80, 81, 56, 55, 40, 1, 85]];
}])