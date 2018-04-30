'use strict';

/*Agremos todos los modulos a utilizar*/
angular.module('2048Simulator', ['ui.router', 'ngAnimate', 'toastr', 'chart.js', 'firebase'])
.config(['ChartJsProvider','toastrConfig', '$stateProvider', '$urlRouterProvider', function(ChartJsProvider, toastrConfig, $stateProvider, $urlRouterProvider) {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyCeP-a1xQRp4zU5J1POkwwOVvyW1JmU0tM",
			authDomain: "game-c5bab.firebaseapp.com",
			databaseURL: "https://game-c5bab.firebaseio.com",
			projectId: "game-c5bab",
			storageBucket: "game-c5bab.appspot.com",
			messagingSenderId: "1082425832460"
		};
		firebase.initializeApp(config);
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
			maxOpened: 4000,    
			newestOnTop: true,
			positionClass: 'toast-top-right',
			preventDuplicates: false,
			preventOpenDuplicates: false,
			target: 'body'
		});

		ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);