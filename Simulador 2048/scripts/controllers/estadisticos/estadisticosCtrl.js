'use strict';
angular.module('2048Simulator')
.controller('estadisticosCtrl', ['$scope', '$EstadisticosService', '$firebaseObject', function($scope, $EstadisticosService, $firebaseObject){
	$scope.estadisticosDeHeuristica;
	$scope.filtro = { heuristica: 'heuristica1', nivelProfundidad: 'profundidad1'};
	//Informacion para el primer grafico
	$scope.dataGrafico1 = [[0,0,0,0]];
	$scope.labelsGrafico1 = ['Derecho', 'Izquierdo', 'Arriba', 'Abajo'];
	$scope.seriesGrafico1 = ['Promedio de movimientos'];
	
	//Informacion para el segundo grafico
	$scope.dataGrafico2 = [[0,0,0,0,0,0,0,0,0]];
	$scope.labelsGrafico2 = ["8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
	$scope.seriesGrafico2 = ['Promedio movimientos: '];

	//Informacion para el primer grafico
	$scope.dataGrafico3 = [[0,0,0,0,0,0,0,0,0]];
	$scope.labelsGrafico3 = ['8', '16', '32', '64', '128', '256', '512', '1024', '2048'];
	$scope.seriesGrafico3 = ['Porcentaje partidas perdidas'];

	$scope.obtenerEstadistico = function(heuristica, nivelProfundidad){
		$firebaseObject(firebase.database().ref('/estadisticosDeHeuristicas/'+heuristica+'/'+nivelProfundidad))
		.$loaded().then(function(estadistico){
			$scope.estadisticosDeHeuristica = estadistico;
			$scope.estadisticosDeHeuristica.porcentajePartidasGanadas = Math.round((estadistico.totalPartidasGanadas/estadistico.totalPartidasJugadas)*100);
			//Agregamos la informacion del primer grafico
			$scope.dataGrafico1[0][0] = estadistico.movimientosPromedioDerecho;
			$scope.dataGrafico1[0][1] = estadistico.movimientosPromedioIzquierdo;
			$scope.dataGrafico1[0][2] = estadistico.movimientosPromedioArriba;
			$scope.dataGrafico1[0][3] = estadistico.movimientosPromedioAbajo;

			//Agregamos la informacion del segundo grafico
			$scope.dataGrafico2[0][0] = estadistico.movimientosPromediosParaPotencias.potencia8;
			$scope.dataGrafico2[0][1] = estadistico.movimientosPromediosParaPotencias.potencia16;
			$scope.dataGrafico2[0][2] = estadistico.movimientosPromediosParaPotencias.potencia32;
			$scope.dataGrafico2[0][3] = estadistico.movimientosPromediosParaPotencias.potencia64;
			$scope.dataGrafico2[0][4] = estadistico.movimientosPromediosParaPotencias.potencia128;
			$scope.dataGrafico2[0][5] = estadistico.movimientosPromediosParaPotencias.potencia256;
			$scope.dataGrafico2[0][6] = estadistico.movimientosPromediosParaPotencias.potencia512;
			$scope.dataGrafico2[0][7] = estadistico.movimientosPromediosParaPotencias.potencia1024;
			$scope.dataGrafico2[0][8] = estadistico.movimientosPromediosParaPotencias.potencia2048;

			//Agregamos la informacion del tercer grafico
			$scope.dataGrafico3[0][0] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia8/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][1] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia16/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][2] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia32/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][3] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia64/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][4] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia128/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][5] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia256/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][6] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia512/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][7] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia1024/estadistico.totalPartidasPerdidas)*100);
			$scope.dataGrafico3[0][8] = Math.round((estadistico.partidasPerdidasPorPotencia.potencia2048/estadistico.totalPartidasPerdidas)*100);
		})
	}
	$scope.obtenerEstadistico('heuristica1', 'profundidad1');
}])