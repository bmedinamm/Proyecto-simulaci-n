angular.module('2048Simulator')
.factory('$TableroService',function(){
    var tablaMonotona = [[7,6,5,4],[6,5,4,3],[5,4,3,2],[4,3,2,1]];
    var DIMENSION = 4;

    //Funcion que revierte una fila
    function revertirFila(fila){
      var tamanio = fila.length;
      for(var i = 0; i<tamanio/2; i++){
        celda = fila[i];
        fila[i] = fila[tamanio - i - 1];
        fila[tamanio - i - 1] = celda;
      }
    }

    //Funcion que calcula y retorna el maximo de dos numeros
    function obtenerMaximo(a, b){
      if(a > b)
        return a;
      else
        return b;
    }

    //Funcion que retorna la sumatoria ponderada entre el estado actual (tablero actual) del juego y una tabla monotona
    function obtenerMonotonia(tablero){
      var sumatoria = 0;
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
          sumatoria += tablero[i][j]*tablaMonotona[i][j];
        }
      }
      return sumatoria;
    }

    //Funcion que obtiene la sumatoria de las medias ponderadas de las diferencias de todas las celdas con todos sus vecinos
    function obtenerSimilitud(tablero){
      var similitud = 0;
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
          if(tablero[i][j] != 0){
            var cantidadVecinos = 0
            var sumatoria = 0
            for(var k = -1; k<2; k++){
              var x = i + k;
              if(x >= 0 && x<DIMENSION){
                for(var l = -1; l<2; l++){
                  var y = j + l;
                  if(y >= 0 && y<DIMENSION){
                    if(tablero[x][y] > 0){
                      cantidadVecinos += 1;
                      sumatoria += Math.abs(tablero[i][j] - tablero[x][y]);
                    }
                  }
                }
              }
            }
            similitud += sumatoria/cantidadVecinos;
          }
        }
      }
      return similitud
    }


    //Funcion que retorna la cantidad de celdas vacias
    function obtenerCantidadCeldasVacias(tablero){
      var cantidad = 0;
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
          if(tablero[i][j] == 0)
            cantidad += 1;
        }
      }
      return cantidad;
    }

    function obtenerCeldaMaxima(tablero){
      var valorMaximo = 0;
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
          valorMaximo = obtenerMaximo(valorMaximo, tablero[i][j]);
        }
      }
      return valorMaximo;
    }
    
    function heuristica1(tablero, cantidadPuntos){
      return cantidadPuntos + obtenerMonotonia(tablero) - obtenerSimilitud(tablero) + Math.log(cantidadPuntos)*obtenerCantidadCeldasVacias(tablero);
    }

    function heuristica2(tablero, cantidadPuntos){
      return obtenerMonotonia(tablero) - obtenerSimilitud(tablero) + Math.log(cantidadPuntos)*obtenerCantidadCeldasVacias(tablero);
    }

    function heuristica3(tablero, cantidadPuntos){
      return cantidadPuntos - obtenerSimilitud(tablero) + Math.log(cantidadPuntos)*obtenerCantidadCeldasVacias(tablero);
    }

    function heuristica4(tablero, cantidadPuntos){
      return cantidadPuntos + (obtenerCantidadCeldasVacias(tablero)*Math.log2(obtenerCeldaMaxima(tablero))) + obtenerMonotonia(tablero);
    }
    
    return{
      //Funcion que obtiene la trasnpuesta de una matriz
      obtenerTranspuestaRejilla: function(rejillaPrincipal){
        var rejillaTemporal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i = 0; i<rejillaPrincipal.length; i++){
          for(var j = 0; j<rejillaPrincipal.length; j++){
            rejillaTemporal[j][i] = rejillaPrincipal[i][j];
          }
        }
        return rejillaTemporal;
      },
      //Funcion que revierte una matriz
      revertirRejilla: function(rejillaPrincipal){
        for(var i = 0; i<rejillaPrincipal.length; i++)
          revertirFila(rejillaPrincipal[i]);
      },
      //Funcion matematica que asocia diferentes estrategias
      aplicarHeuristica: function(tablero, cantidadPuntos, heuristica){
        if(heuristica == 1)
          return heuristica1(tablero, cantidadPuntos);
        else if(heuristica == 2)
          return heuristica2(tablero, cantidadPuntos);
        else if(heuristica == 3)
          return heuristica3(tablero, cantidadPuntos);
        else
          return heuristica4(tablero, cantidadPuntos);
      },
      obtenerCantidadCeldasVacias: function(tablero){
        return obtenerCantidadCeldasVacias(tablero);
      },
      //Funcion que obtiene una replica de un arreglo, pero sin las referenias de sus elementos
      obtenerReplicaTablero: function(tablero){
        var nuevoTablero = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i = 0; i<DIMENSION; i++){
          for(var j = 0; j<DIMENSION; j++){
            nuevoTablero[i][j] = tablero[i][j];
          }
        }
        return nuevoTablero;
      },
      //Funcion que compara si dos tableros son iguales
      sonIguales: function(tablero1, tablero2){
        var igualdad = true;
        for(var i = 0; i<DIMENSION; i++){
          for(var j = 0; j<DIMENSION; j++){
            if(tablero1[i][j] != tablero2[i][j])
              return false;
          }
        }
        return igualdad;
      },
      imprimirTablero: function(tablero){
        var cadena = '';
        for(var i = 0; i<DIMENSION; i++){
            var fila = '';
            for(j = 0; j<DIMENSION; j++){
                fila += tablero[i][j] + '\t';
            }
            cadena += fila+'\n';
        }
        console.log(cadena);
    }
    }
})