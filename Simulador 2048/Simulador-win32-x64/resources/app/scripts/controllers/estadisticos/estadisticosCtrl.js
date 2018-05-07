'use strict';
angular.module('2048Simulator')
.controller('estadisticosCtrl', ['$scope', '$EstadisticosService', function($scope, $EstadisticosService){
	$scope.dataGrafico1 = [[],[]];
	$scope.dataGrafico2 = [[]];
	$scope.dataGrafico1 = [[8,41,52,15],[4,5,6,7]];
	$scope.labelsGrafico1 = ['Heuristica 1', 'Heuristica 2', 'Heuristica 3', 'Heuristica 4'];
	$scope.seriesGrafico1 = ['Porcentaje ganado ', 'Porcentaje perdido '];
	
	$scope.estadisticosExpectiMax = $EstadisticosService.obtenerEstadisticosExpectiMax();
	$scope.estadisticosExpectiMax.$loaded()
	.then(function(respuesta) {
		//Obtenemos los valores de las partidas ganadas por cada heuristica
		Object.keys(respuesta.heuristicas.partidasGanadas).map(function(objectKey, index) {
		    $scope.dataGrafico1[0].push(respuesta.heuristicas.partidasGanadas[objectKey].porcentaje);
		});

		//Obtenemos los valores de las partidas perdidas por cada heuristica
		Object.keys(respuesta.heuristicas.partidasPerdidas).map(function(objectKey, index) {
		    $scope.dataGrafico1[1].push(respuesta.heuristicas.partidasPerdidas[objectKey].porcentaje);
		});

		//Obtenemos los valores de movimientos para obtener las potencias de 2
		$scope.dataGrafico2 = [[respuesta.potencias.p8, 
								respuesta.potencias.p16, 
								respuesta.potencias.p32,
								respuesta.potencias.p64, 
								respuesta.potencias.p128, 
								respuesta.potencias.p256,
								respuesta.potencias.p512, 
								respuesta.potencias.p1024,
								respuesta.potencias.p2048]];
     });

	$scope.labelsGrafico2 = ["8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
	$scope.seriesGrafico2 = ['Promedio movimientos: '];
}])