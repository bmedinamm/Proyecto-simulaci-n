'use strict';
angular.module('2048Simulator')
.controller('principalCtrl', ['$scope','$TableroService',function($scope, $TableroService){
	$scope.rejillaPrincipal = [];

	$scope.limpiarTablero = function () {
		$scope.rejillaPrincipal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	}
	$scope.limpiarTablero();

	$scope.generarTablero = function() {
		$scope.limpiarTablero();
		$TableroService.agregarNumero($scope.rejillaPrincipal);
		$TableroService.agregarNumero($scope.rejillaPrincipal);
	}

	//Funcion que mueve todo los elementos del tablero hacia la izquierda
	$scope.moverEnDireccionIzquierda = function(){
		$TableroService.moverEnDireccionIzquierda($scope.rejillaPrincipal, true);
		$TableroService.agregarNumero($scope.rejillaPrincipal);
	}

	//Funcion que mueve todo los elementos del tablero hacia la derecha
	$scope.moverEnDireccionDerecha = function(){
		$TableroService.moverEnDireccionDerecha($scope.rejillaPrincipal, true);
		$TableroService.agregarNumero($scope.rejillaPrincipal);
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionArriba = function(){
		$scope.rejillaPrincipal = $TableroService.moverEnDireccionArriba($scope.rejillaPrincipal, true);
		$TableroService.agregarNumero($scope.rejillaPrincipal);
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionAbajo = function(){
		$scope.rejillaPrincipal = $TableroService.moverEnDireccionAbajo($scope.rejillaPrincipal, true);
		//$TableroService.agregarNumero($scope.rejillaPrincipal);
	}

}])