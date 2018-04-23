'use strict';
angular.module('2048Simulator')
.controller('inicioSesionCtrl', ['$scope', '$location', function($scope, $location){
	
	$scope.iniciarSesion = function(correo, contrasenia){
		$location.path('/principal')
	}
}])