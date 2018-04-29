'use strict';
angular.module('2048Simulator')
.controller('principalCtrl', ['$timeout','$TableroService','$scope','$JuegoService','$ExpectiMaxService', function($timeout, $TableroService, $scope, $JuegoService, $ExpectiMaxService){
	$scope.rejillaPrincipal = [];
	$scope.movimiento = {};
	
	$scope.limpiarTablero = function () {
		$scope.rejillaPrincipal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		$scope.movimiento = { movimientoAdecuado: null, estadisticos: [0,0,0,0]};
	}
	$scope.limpiarTablero();

	$scope.generarTablero = function() {
		$scope.limpiarTablero();
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia la izquierda
	$scope.moverEnDireccionIzquierda = function(){
		$scope.rejillaPrincipal = $JuegoService.moverEnDireccionIzquierda($scope.rejillaPrincipal, true, 'real');
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia la derecha
	$scope.moverEnDireccionDerecha = function(){
		$scope.rejillaPrincipal = $JuegoService.moverEnDireccionDerecha($scope.rejillaPrincipal, true, 'real');
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
		$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, 5, 10, 'MAX', true);
	}

	//Funcion que juega de forma automatizada en base a las ayudas del algoritmo que procesa el juego
	$scope.jugarDeFormaAutomatica = function(){
		//$scope.generarTablero();
		var contador = 1;
		//Ejecutamos el ciclo infinito mientras no haya terminado la partida
		while(!$JuegoService.haTerminado($scope.rejillaPrincipal)){
			$timeout(function(){
				$('#celda01').val($scope.rejillaPrincipal[0][0]);
				
			},1000);
			$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, 5, 10, 'MAX', true);
			console.log('Estado: '+contador+', movimiento: '+$scope.movimiento.movimientoAdecuado);
			$TableroService.imprimirTablero($scope.rejillaPrincipal);
			$scope.rejillaPrincipal = $JuegoService.realizarMovimiento($scope.movimiento.movimientoAdecuado, $scope.rejillaPrincipal, true, 'real');

			if($TableroService.obtenerCantidadCeldasVacias($scope.rejillaPrincipal) != 0)
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			
			contador++;
		}
	}
}])