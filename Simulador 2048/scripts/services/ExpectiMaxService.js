angular.module('2048Simulator')
.factory('$ExpectiMaxService',function($TableroService, $JuegoService){
    var DIMENSION = 4;

    //Funcion que calcula y retorna el maximo de dos numeros
    function obtenerMaximo(a, b){
    	if(a > b)
    		return a;
    	else
    		return b;
    }

    //Funcion que retorna el movimiento mas adecuado a realizar en base a las posibilidades de exito por cada una de las primeras 4 rutas
    function obtenerMovimientoAdecuado(datosEsenciales){
        var estadisticos = [0,0,0,0];
        var valormax = 0;
        var movimiento;
        var sumatoria = 0;
        //Buscamos el valor valor de los pesos de los primeros 4 caminos
        for(var i = 0; i<datosEsenciales.length; i++){
            sumatoria += datosEsenciales[i][1];
            valormax = obtenerMaximo(valormax, datosEsenciales[i][1]);
        }

        //Obtenemos el indice o camino que contiene el valor mayor de los pesos
        for(var i = 0; i<datosEsenciales.length; i++){
            if(datosEsenciales[i][1] == valormax){
                movimiento = datosEsenciales[i][0];
                break;
            }
        }
        //Calculamos los porcentajes de exito por cada uno de los primeros 4 caminos
        for(var i = 0; i<datosEsenciales.length; i++){
            if(datosEsenciales[i][1] != undefined)
                estadisticos[datosEsenciales[i][0]] = Math.round((datosEsenciales[i][1]/sumatoria)*100);
        }
        if(movimiento == undefined)
            movimiento = (Math.floor(Math.random() * (4 - 0) + 0));
        return {movimientoAdecuado: movimiento, estadisticos: estadisticos}
    }

    //Funcion que retorna el movimiento mas adecuado a realizar, segun un estado dado
    function expectiMax(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento, heuristica){
		//Evaluamos el caso base (ultimo nivel de profundidad)
        if(nivel == 0){
            //console.log(tablero);
            return $TableroService.aplicarHeuristica(tablero, $JuegoService.obtenerPuntuacion(tipoJuego), heuristica);
        }
        else{
            //Evaluamos si el nodo o estado a procesar es de tipo MAX
            if(tipoNodo == 'MAX'){
                var nodosFinales = [];
                var a = 0;
                for(var i = 0; i<DIMENSION; i++){
                    $JuegoService.establecerPuntuacion(puntuacion, tipoJuego);
                    var array1 = $TableroService.obtenerReplicaTablero(tablero);
                    array1 = $JuegoService.realizarMovimiento(i, array1, true, tipoJuego);
                    //Podamos el nodo si el movimiento anterior produce el mismo tablero
                    if(!$TableroService.sonIguales(array1, tablero)){
                        var valorNodo = expectiMax(tipoJuego, array1, nivel - 1, $JuegoService.obtenerPuntuacion(tipoJuego), 'CHANGE', false, heuristica);
                        if(retornarMovimiento)
                            nodosFinales.push([i, valorNodo]);
                        a = obtenerMaximo(a,valorNodo)
                    }
                }
                if(retornarMovimiento){
                    //Retornamos un arreglo bidimensional de la forma [[0,x1],[1,x2],[2,x3],[3,x4]] donde el mayor de los x es el camino mas acertado
                    return obtenerMovimientoAdecuado(nodosFinales);
                }
                else
                    return a;
            }
            //Aqui se procesan todos los nodos o estados de tipo CHANGE
            else{
                var a = 0;
                var cantidadCeldasVacias = $TableroService.obtenerCantidadCeldasVacias(tablero);
                for(var i = 0; i<cantidadCeldasVacias*2; i++){
                	var peso;
                    $JuegoService.establecerPuntuacion(puntuacion, tipoJuego);
                    var array1 = $TableroService.obtenerReplicaTablero(tablero);
                    if(i < cantidadCeldasVacias){
                        peso = (1.0/cantidadCeldasVacias)*0.9;
                        $JuegoService.agregarCelda(array1 , 2);
                    }
                    else{
                        peso = (1.0/cantidadCeldasVacias)*0.1;
                        $JuegoService.agregarCelda(array1 , 4);
                    }
                    a += peso * expectiMax(tipoJuego, array1, nivel - 1, puntuacion, 'MAX', false, heuristica);
                }
                return a;
            }
        }	
    }

    return{
    	//Funcion que retorna el movimiento mas adecuado a realizar, segun un estado dado
    	expectiMax: function(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento, heuristica){
    		return expectiMax(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento, heuristica);
    	}
    }
})