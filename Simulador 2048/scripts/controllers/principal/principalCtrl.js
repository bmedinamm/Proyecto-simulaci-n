'use strict';
angular.module('2048Simulator')
.controller('principalCtrl', ['$EstadisticosService','$location','toastr','$interval','$rootScope','$timeout','$TableroService','$scope','$JuegoService','$ExpectiMaxService', 
	function($EstadisticosService, $location, toastr, $interval, $rootScope,$timeout, $TableroService, $scope, $JuegoService, $ExpectiMaxService){
	
	$scope.rejillaPrincipal = [];
	$scope.configuracion = {tipoHeuristica: '1', nivelProfundidad: '5'};
	$scope.movimiento = {};
	$scope.tipoHeuristica = '1';
	$scope.procesando = false;
	$rootScope.mostrarFondoInicio = true;
	var avisoMostrado = false;
	var tableroVacio = true;
	$scope.partida;
	var listaPotencias = [];
	
	//Funcion que inicializa todos los valores de un tablero
	$scope.limpiarTablero = function () {
		if(!$scope.procesando){
			tableroVacio = true;
			$JuegoService.inicializarDatos();
			$scope.rejillaPrincipal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			$scope.movimiento = { movimientoAdecuado: null, estadisticos: [0,0,0,0]};
			$scope.partida = { 
				totalMovimientos: 0,
				movimientosDerecha: 0,
				movimientosIzquierda: 0,
				movimientosArriba: 0,
				movimientosAbajo: 0,
			}
			listaPotencias = [
								{obtenido: false, potencia: 8, cantidadEstados: 0},
								{obtenido: false, potencia: 16, cantidadEstados: 0},
								{obtenido: false, potencia: 32, cantidadEstados: 0},
								{obtenido: false, potencia: 64, cantidadEstados: 0},
								{obtenido: false, potencia: 128, cantidadEstados: 0},
								{obtenido: false, potencia: 256, cantidadEstados: 0},
								{obtenido: false, potencia: 512, cantidadEstados: 0},
								{obtenido: false, potencia: 1024, cantidadEstados: 0},
								{obtenido: false, potencia: 2048, cantidadEstados: 0}
							]
		}
	}
	$scope.limpiarTablero();

	//Funcion que detiene el proceso de juego automatizado
	$scope.detenerProcesamiento = function(){
		$scope.procesando = false;
	}

	$scope.abrirModalConfiguracion = function(){
		$('#modalConfiguracion').modal('show');
	}

	//Funcion que valida si el valor agregado a una celda es un numero
	$scope.validarCelda = function(indice1, indice2, valor){
		if(!isNaN(valor) && valor != null){//Indica que es un numero
			if(Number.isInteger(Math.log2(valor))){
				$scope.rejillaPrincipal[indice1][indice2] = Math.abs(valor);
				if(valor != 0)//Indica que es otra cosa menos un numero
					tableroVacio = false;
			}
			else
				toastr.warning('El valor agregado debe ser potencia de 2', valor+' no es válido');
		}
		else
			$scope.rejillaPrincipal[indice1][indice2] = 0;
	}

	//Funcion que agrega aleatoriamente 2 celdas al tablero
	$scope.generarTablero = function() {
		$scope.abrirVista('principal', true);
		$scope.limpiarTablero();
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
		$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
		tableroVacio = false;
	}

	//Funcion que mueve todo los elementos del tablero hacia la izquierda
	$scope.moverEnDireccionIzquierda = function(){
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.rejillaPrincipal = $JuegoService.moverEnDireccionIzquierda($scope.rejillaPrincipal, true, 'real');
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
				$scope.partida.totalMovimientos++;
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia la derecha
	$scope.moverEnDireccionDerecha = function(){
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.rejillaPrincipal = $JuegoService.moverEnDireccionDerecha($scope.rejillaPrincipal, true, 'real');
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
				$scope.partida.totalMovimientos++;
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionArriba = function(){
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.rejillaPrincipal = $JuegoService.moverEnDireccionArriba($scope.rejillaPrincipal, true, 'real');
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
				$scope.partida.totalMovimientos++;
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}

	//Funcion que mueve todo los elementos del tablero hacia arriba
	$scope.moverEnDireccionAbajo = function(){
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.rejillaPrincipal = $JuegoService.moverEnDireccionAbajo($scope.rejillaPrincipal, true, 'real');
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
				$scope.partida.totalMovimientos++;
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}

	//Funcion que envia el estado actual a expectiMax para obtener un movimiento adecuado
	$scope.obtenerAyuda = function(){
		$scope.abrirVista('principal', true);
		if(!$scope.procesando){
			$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, parseInt($scope.configuracion.nivelProfundidad), 10, 'MAX', true, parseInt($scope.configuracion.tipoHeuristica));
		}
	}

	function obtenerIntervaloDeTiempo(){
		switch (parseInt($scope.configuracion.nivelProfundidad)) {
		  	case 1:
		  		return 5;
		  	case 2:
		  		return 10;
		  	case 3:
		  		return 15;
		  	case 4:
		  		return 20;
		  	case 5:
		  		return 50;
		  	case 6:
		  		return 1000;
		  	case 7:
		  		return 4000;
		  	
		  	default:
		  		break;
		}
	}

	//Funcion que juega de forma automatizada en base a las ayudas del algoritmo que procesa el juego
	$scope.jugarDeFormaAutomatica = function(){
		$scope.abrirVista('principal', true);
		avisoMostrado = false;
		if(!$scope.procesando){
			if(!tableroVacio){
				$scope.procesando = true;
				//jugarDeFormaAutomatica();
				$interval(function(){
					jugarDeFormaAutomatica();
				},obtenerIntervaloDeTiempo());
			}
			else
				toastr.error('Las celdas deben estar llenas', 'Tablero vacío');
		}
	}

	function actualizarDatosPartida(movimiento){
		$scope.partida.totalMovimientos ++;
		switch (movimiento) {
		  	case 0:
		  		$scope.partida.movimientosIzquierda += 1;
		  		break;
		  	case 1:
		  		$scope.partida.movimientosDerecha += 1;
		  		break;
		  	case 2:
		  		$scope.partida.movimientosArriba += 1;
		  		break;
		  	case 3:
		  		$scope.partida.movimientosAbajo += 1;
		  		break;
		  	
		  	default:
		  		break;
		}
	}

	function detectarAparicionesImportantesPotencias(potencia, cantidadEstados){
		for(var i = 0; i<listaPotencias.length; i++){
			if(listaPotencias[i].potencia == potencia && !listaPotencias[i].obtenido){
				//console.log('Primera aparicion de '+potencia+' en es estado '+cantidadEstados);
				listaPotencias[i].cantidadEstados = cantidadEstados;
				listaPotencias[i].obtenido = true;
				break;
			}
		}
	}
	
	var potenciaMaxima;
	function jugarDeFormaAutomatica(){
		if(!$JuegoService.haTerminado($scope.rejillaPrincipal) && $scope.procesando){
			$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, parseInt($scope.configuracion.nivelProfundidad), 10, 'MAX', true, parseInt($scope.configuracion.tipoHeuristica));
			$scope.rejillaPrincipal = $JuegoService.realizarMovimiento($scope.movimiento.movimientoAdecuado, $scope.rejillaPrincipal, true, 'real');
			if($TableroService.obtenerCantidadCeldasVacias($scope.rejillaPrincipal) != 0)
				$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
			actualizarDatosPartida($scope.movimiento.movimientoAdecuado);
			potenciaMaxima = $TableroService.obtenerCeldaMaxima($scope.rejillaPrincipal);
			detectarAparicionesImportantesPotencias(potenciaMaxima, $scope.partida.totalMovimientos);
		}
		else{
			$interval.cancel();
			if(!avisoMostrado){
				var heuristica = parseInt($scope.configuracion.tipoHeuristica);
				var nivelProfundidad = parseInt($scope.configuracion.nivelProfundidad);
				$scope.partida.tipoHeuristica = heuristica;
				$scope.partida.nivelProfundidad = nivelProfundidad;
				if($JuegoService.haGanado($scope.rejillaPrincipal)){
					toastr.success('Se ha ganado con exíto', 'Partida ganada');
					//Procesamos el estadistico obtenido
					$EstadisticosService.actualizarMovimientoPromedioGanarPartida('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.totalMovimientos);
					$EstadisticosService.actualizarMovimientosPromedioIzquierdo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosIzquierda);
					$EstadisticosService.actualizarMovimientosPromedioDerecho('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosDerecha);
					$EstadisticosService.actualizarMovimientosPromedioArriba('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosArriba);
					$EstadisticosService.actualizarMovimientosPromedioAbajo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosAbajo);
					$EstadisticosService.actualizarMovimientosPromediosParaPotencias('heuristica'+heuristica, 'profundidad'+nivelProfundidad, listaPotencias);
					$EstadisticosService.incrementarTotalPartidasJugadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
					$EstadisticosService.incrementarTotalPartidasGanadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
					//Guardamos la informacion capturada de la partida
					$scope.partida.partidaGanada = true;
					//$EstadisticosService.guardarPartida($scope.partida);
					$EstadisticosService.sincronizarCambios();
				}
				else{
					if($scope.procesando){
						toastr.error('Se ha perdido la partida', 'Partida Perdida');
						//Procesamos el estadistico obtenido
						$EstadisticosService.actualizarMovimientosPromedioIzquierdo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosIzquierda);
						$EstadisticosService.actualizarMovimientosPromedioDerecho('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosDerecha);
						$EstadisticosService.actualizarMovimientosPromedioArriba('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosArriba);
						$EstadisticosService.actualizarMovimientosPromedioAbajo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosAbajo);
						$EstadisticosService.incrementarPartidasPerdidasDePotencia('heuristica'+heuristica, 'profundidad'+nivelProfundidad, 'potencia'+potenciaMaxima);
						$EstadisticosService.incrementarTotalPartidasJugadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
						$EstadisticosService.incrementarTotalPartidasPerdidas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);

						//Guardamos la informacion capturada de la partida
						$scope.partida.partidaGanada = false;
						$EstadisticosService.sincronizarCambios();
						//$EstadisticosService.guardarPartida($scope.partida);
					}
					else
						toastr.info('Se ha detenido la partida', 'Partida detenida');
				}
				avisoMostrado = true;
				$scope.movimiento = { movimientoAdecuado: null, estadisticos: [0,0,0,0]};
			}
			$scope.procesando = false;
		}
	}

	$scope.abrirVista = function(path, mostrarFondoInicio){
		$rootScope.mostrarFondoInicio = mostrarFondoInicio;
		$location.path(path);
	}

	$scope.abrirModalInformacion = function(){
		$('#modalInformacion').modal('show');
	}

	var promedioTiempo = 0;
	var cantidadCiclos = 0;
	var tiempoInicial = 0;
	var tiempoFinal = 0;
	$scope.correrEnConsola = function(){
		var cantidadPartidas = 1;
		tiempoInicial = (new Date()).getTime();
		while(cantidadPartidas <= 1){
			$scope.generarTablero();
			console.clear();
			var celdaMaxima
			//Elegimos la heuristica y el nivel de profundidad
			$scope.configuracion.tipoHeuristica = (Math.floor(Math.random() * (5 - 1) + 1));
			$scope.configuracion.nivelProfundidad = 7;
			while(!$JuegoService.haTerminado($scope.rejillaPrincipal)){
				var t1 = (new Date()).getTime();
				cantidadCiclos++;
				$scope.movimiento = $ExpectiMaxService.expectiMax('juegoPrueba', $scope.rejillaPrincipal, parseInt($scope.configuracion.nivelProfundidad), 10, 'MAX', true, parseInt($scope.configuracion.tipoHeuristica));
				$scope.rejillaPrincipal = $JuegoService.realizarMovimiento($scope.movimiento.movimientoAdecuado, $scope.rejillaPrincipal, true, 'real');
				if($TableroService.obtenerCantidadCeldasVacias($scope.rejillaPrincipal) != 0)
					$JuegoService.agregarCelda($scope.rejillaPrincipal, null);
				actualizarDatosPartida($scope.movimiento.movimientoAdecuado);
				celdaMaxima = $TableroService.obtenerCeldaMaxima($scope.rejillaPrincipal);
				detectarAparicionesImportantesPotencias(celdaMaxima, $scope.partida.totalMovimientos);
				var t2 = (new Date()).getTime();
				console.log('Partida: '+cantidadPartidas+' heur: '+$scope.configuracion.tipoHeuristica+' profun '+$scope.configuracion.nivelProfundidad+' celdamax: '+celdaMaxima+' estado: '+$scope.partida.totalMovimientos+' movimiento: '+$scope.movimiento.movimientoAdecuado+' tiempo: '+(t2-t1));

				if(cantidadCiclos == 50)
					break;
			}

			var heuristica = parseInt($scope.configuracion.tipoHeuristica);
			var nivelProfundidad = parseInt($scope.configuracion.nivelProfundidad);
			$scope.partida.tipoHeuristica = heuristica;
			$scope.partida.nivelProfundidad = nivelProfundidad;

			if($JuegoService.haGanado($scope.rejillaPrincipal)){
				//Procesamos el estadistico obtenido
				$EstadisticosService.actualizarMovimientoPromedioGanarPartida('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.totalMovimientos);
				$EstadisticosService.actualizarMovimientosPromedioIzquierdo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosIzquierda);
				$EstadisticosService.actualizarMovimientosPromedioDerecho('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosDerecha);
				$EstadisticosService.actualizarMovimientosPromedioArriba('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosArriba);
				$EstadisticosService.actualizarMovimientosPromedioAbajo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosAbajo);
				$EstadisticosService.actualizarMovimientosPromediosParaPotencias('heuristica'+heuristica, 'profundidad'+nivelProfundidad, listaPotencias);
				$EstadisticosService.incrementarTotalPartidasJugadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
				$EstadisticosService.incrementarTotalPartidasGanadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
				//Guardamos la informacion capturada de la partida
				$scope.partida.partidaGanada = true;
				//$EstadisticosService.guardarPartida($scope.partida);
			}
			else{
				//Procesamos el estadistico obtenido
				$EstadisticosService.actualizarMovimientosPromedioIzquierdo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosIzquierda);
				$EstadisticosService.actualizarMovimientosPromedioDerecho('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosDerecha);
				$EstadisticosService.actualizarMovimientosPromedioArriba('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosArriba);
				$EstadisticosService.actualizarMovimientosPromedioAbajo('heuristica'+heuristica, 'profundidad'+nivelProfundidad, $scope.partida.movimientosAbajo);
				$EstadisticosService.incrementarPartidasPerdidasDePotencia('heuristica'+heuristica, 'profundidad'+nivelProfundidad, 'potencia'+celdaMaxima);
				$EstadisticosService.incrementarTotalPartidasJugadas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);
				$EstadisticosService.incrementarTotalPartidasPerdidas('heuristica'+heuristica, 'profundidad'+nivelProfundidad);

				//Guardamos la informacion capturada de la partida
				$scope.partida.partidaGanada = false;
				//$EstadisticosService.guardarPartida($scope.partida);
			}
			$scope.movimiento = { movimientoAdecuado: null, estadisticos: [0,0,0,0]};
			$scope.limpiarTablero();
			cantidadPartidas++;
		}
		tiempoFinal = (new Date()).getTime();
		console.log('Tiempo total = '+(tiempoFinal - tiempoInicial));
		promedioTiempo = (tiempoFinal - tiempoInicial)/cantidadCiclos;
		console.log('Tiempo promedio por ciclo: '+promedioTiempo);
		$EstadisticosService.sincronizarCambios();
	}
}])