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

    //Funcion que retorna el movimiento mas adecuado a realizar, segun un estado dado
    function expectiMax(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento){
		//Evaluamos el caso base (ultimo nivel de profundidad)
        if(nivel == 0)
            return $TableroService.aplicarHeuristica1(tablero, $JuegoService.obtenerPuntuacion(tipoJuego));
        else{
            //Evaluamos si el nodo o estado a procesar es de tipo MAX
            if(tipoNodo == 'MAX'){
                var nodosFinales = [];
                var a = 0;
                for(var i = 0; i<DIMENSION; i++){
                    $JuegoService.establecerPuntuacion(puntuacion, tipoJuego);
                    var array1 = $TableroService.obtenerReplicaTablero(tablero);
                    $JuegoService.realizarMovimiento(i, array1, true, tipoJuego);
                    //Podamos el nodo si el movimiento anterior produce el mismo tablero
                    if(!$TableroService.sonIguales(array1, tablero)){
                        var valorNodo = expectiMax(tipoJuego, array1, nivel - 1, $JuegoService.obtenerPuntuacion(tipoJuego), 'CHANGE', false);
                        if(retornarMovimiento)
                            nodosFinales.push([i, valorNodo]);
                        a = obtenerMaximo(a,valorNodo)
                    }
                }
                if(retornarMovimiento){
                    var valormax = 0;
                    for(var i = 0; i<nodosFinales.length; i++)
                        valormax = obtenerMaximo(valormax, nodosFinales[i][1]);
                    for(var i = 0; i<nodosFinales.length; i++){
                        if(nodosFinales[i][1] == valormax)
                            return nodosFinales[i][0];//Retornamos el mejor movimiento
                    }
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
                    a += peso * expectiMax(tipoJuego, array1, nivel - 1, puntuacion, 'MAX', false);
                }
                return a;
            }
        }	
    }

    return{
    	//Funcion que retorna el movimiento mas adecuado a realizar, segun un estado dado
    	expectiMax: function(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento){
    		return expectiMax(tipoJuego, tablero, nivel, puntuacion, tipoNodo, retornarMovimiento);
    	}
    }
})