'use strict';
angular.module('2048Simulator')
.controller('principalCtrl', ['$scope','$JuegoService','$ExpectiMaxService', function($scope, $JuegoService, $ExpectiMaxService){
	$scope.rejillaPrincipal = [];

	$scope.limpiarTablero = function () {
		$scope.rejillaPrincipal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	}
	$scope.limpiarTablero();

	$scope.generarTablero = function() {
		$scope.limpiarTablero();
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia la izquierda
	$scope.moverEnDireccionIzquierda = function(){
		$JuegoService.moverEnDireccionIzquierda($scope.rejillaPrincipal, true, 'real');
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia la derecha
	$scope.moverEnDireccionDerecha = function(){
		$JuegoService.moverEnDireccionDerecha($scope.rejillaPrincipal, true, 'real');
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionArriba = function(){
		$scope.rejillaPrincipal = $JuegoService.moverEnDireccionArriba($scope.rejillaPrincipal, true, 'real');
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionAbajo = function(){
		$scope.rejillaPrincipal = $JuegoService.moverEnDireccionAbajo($scope.rejillaPrincipal, true, 'real');
		//$JuegoService.agregarNumero($scope.rejillaPrincipal);
	}

	//Funcion que envia el estado actual a expectiMax para obtener un movimiento adecuado
	$scope.obtenerAyuda = function(){
		console.log('Obteniendo movimiento');
		console.log($ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, 5, 10, 'MAX', true));
	}

}])