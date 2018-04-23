'use strict';

/*Agremos todos los modulos a utilizar*/
angular.module('2048Simulator', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider 
			/*Establecemos los estados por cada vista y sub-vista de la aplicacion*/
			.state('principal', {
				url:'/principal',
				templateUrl: 'views/principal/principal.html',
				controller: 'principalCtrl'
			})
			.state('inicioSesion', {
				url:'/inicioSesion',
				templateUrl: 'views/inicioSesion/inicioSesion.html',
				controller: 'inicioSesionCtrl'
			});
		$urlRouterProvider.otherwise('/principal');
}])