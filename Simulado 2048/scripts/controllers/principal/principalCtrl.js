'use strict';
angular.module('2048Simulator')
.controller('principalCtrl', ['$location','toastr','$interval','$rootScope','$timeout','$TableroService','$scope','$JuegoService','$ExpectiMaxService', 
	function($location, toastr, $interval, $rootScope,$timeout, $TableroService, $scope, $JuegoService, $ExpectiMaxService){
	
	$scope.rejillaPrincipal = [];
	$scope.movimiento = {};
	$scope.cantidadEstados = 0;
	$scope.tipoHeuristica = '1';
	$scope.procesando = false;
	$rootScope.mostrarFondoInicio = true;
	var avisoMostrado = false;
	var tableroVacio = true;
	
	//Funcion que inicializa todos los valores de un tablero
	$scope.limpiarTablero = function () {
		if(!$scope.procesando){
			$scope.rejillaPrincipal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			$scope.movimiento = { movimientoAdecuado: null, estadisticos: [0,0,0,0]};
			$scope.cantidadEstados = 0;
		}
	}
	$scope.limpiarTablero();

	//Funcion que detiene el proceso de juego automatizado
	$scope.detenerProcesamiento = function(){
		$scope.procesando = false;
	}

	//Funcion que valida si el valor agregado a una celda es un numero
	$scope.validarCelda = function(indice1, indice2, valor){
		if(!isNaN(valor)){
			$scope.rejillaPrincipal[indice1][indice2] = Math.abs(valor);
			if(valor != 0)
				tableroVacio = false;
		}
		else
			$scope.rejillaPrincipal[indice1][indice2] = 0;
	}

	//Funcion que agrega aleatoriamente 2 celdas al tablero
	$scope.generarTablero = function() {
		tableroVacio = false;
		$scope.limpiarTablero();
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
	}

	//Funcion que mueve todo los elementos del tablero hacia la izquierda
	$scope.moverEnDireccionIzquierda = function(){
		if(!$scope.procesando){
			$scope.rejillaPrincipal = $JuegoService.moverEnDireccionIzquierda($scope.rejillaPrincipal, true, 'real');
			$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			$scope.cantidadEstados++;
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia la derecha
	$scope.moverEnDireccionDerecha = function(){
		if(!$scope.procesando){
			$scope.rejillaPrincipal = $JuegoService.moverEnDireccionDerecha($scope.rejillaPrincipal, true, 'real');
			$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			$scope.cantidadEstados++;
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionArriba = function(){
		if(!$scope.procesando){
			$scope.rejillaPrincipal = $JuegoService.moverEnDireccionArriba($scope.rejillaPrincipal, true, 'real');
			$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			$scope.cantidadEstados++;
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionAbajo = function(){
		if(!$scope.procesando){
			$scope.rejillaPrincipal = $JuegoService.moverEnDireccionAbajo($scope.rejillaPrincipal, true, 'real');
			$scope.cantidadEstados++;
		}
	}

	//Funcion que envia el estado actual a expectiMax para obtener un movimiento adecuado
	$scope.obtenerAyuda = function(){
		if(!$scope.procesando){
			$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, 5, 10, 'MAX', true, parseInt($scope.tipoHeuristica));
		}
	}

	//Funcion que juega de forma automatizada en base a las ayudas del algoritmo que procesa el juego
	$scope.jugarDeFormaAutomatica = function(){
		avisoMostrado = false;
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.procesando = true;
				jugarDeFormaAutomatica();
				$interval(function(){
					jugarDeFormaAutomatica();
				},100);
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}
	
	function jugarDeFormaAutomatica(){
		if(!$JuegoService.haTerminado($scope.rejillaPrincipal) && $scope.procesando){
			$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, 5, 10, 'MAX', true, parseInt($scope.tipoHeuristica));
			$scope.rejillaPrincipal = $JuegoService.realizarMovimiento($scope.movimiento.movimientoAdecuado, $scope.rejillaPrincipal, true, 'real');
			if($TableroService.obtenerCantidadCeldasVacias($scope.rejillaPrincipal) != 0)
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			$scope.cantidadEstados ++;
		}
		else{
			$interval.cancel();
			if(!avisoMostrado){
				if($JuegoService.haGanado($scope.rejillaPrincipal))
					toastr.success('Se ha ganado con exíto', 'Partida ganada');
				else{
					if($scope.procesando)
						toastr.error('Se ha perdido la partida', 'Partida Perdida');
					else
						toastr.info('Se ha detenido la partida', 'Partida detenida');
				}
				avisoMostrado = true;
			}
			$scope.procesando = false;
		}
	}

	$scope.abrirVista = function(path, mostrarFondoInicio){
		$rootScope.mostrarFondoInicio = mostrarFondoInicio;
		$location.path(path);
	}
}])