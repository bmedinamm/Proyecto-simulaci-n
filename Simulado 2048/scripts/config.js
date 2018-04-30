'use strict';

/*Agremos todos los modulos a utilizar*/
angular.module('2048Simulator', ['ui.router', 'ngAnimate', 'toastr', 'chart.js'])
.config(['ChartJsProvider','toastrConfig', '$stateProvider', '$urlRouterProvider', function(ChartJsProvider, toastrConfig, $stateProvider, $urlRouterProvider) {
		$stateProvider 
			/*Establecemos los estados por cada vista y sub-vista de la aplicacion*/
			.state('principal', {
				url:'/principal',
				templateUrl: 'views/principal/principal.html',
				controller: 'principalCtrl'
			})
			.state('principal.estadisticos', {
				url:'/estadisticos',
				templateUrl: 'views/estadisticos/estadisticos.html',
				controller: 'estadisticosCtrl'
			});
		$urlRouterProvider.otherwise('/principal');

		angular.extend(toastrConfig, {
			autoDismiss: false,
			containerId: 'toast-container',
			maxOpened: 3000,    
			newestOnTop: true,
			positionClass: 'toast-top-right',
			preventDuplicates: false,
			preventOpenDuplicates: false,
			target: 'body'
		});

		ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);