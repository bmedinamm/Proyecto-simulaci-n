angular.module('2048Simulator')
.factory('$JuegoService',function($TableroService){
    var cantidadPuntosReal = 2;
    var cantidadPuntosPrueba = 2;
    var OBJETIVO = 2048;
    var DIMENSION = 4;

    //Funcion que dispara elemento por elemento de una fila y realiza tres acciones (Fusionar, desplazar o no hacer nads)
    function dispararAlInicio(posicion, fila, ultimoIndiceFusionado, incrementarPuntuacion, tipoJuego){
      var cantidadFusiones = 0;
      for(var i = 0; i < posicion; i++){
        if(fila[posicion - 1 - i] == fila[posicion - i] && ultimoIndiceFusionado != posicion-i-1 && cantidadFusiones < 1){
          //Fusionamos los elementos vecinos
          fila[posicion-i-1] = fila[posicion-i-1] + fila[posicion-i];
          fila[posicion-i] = 0;
          ultimoIndiceFusionado = posicion-i-1;
          if(incrementarPuntuacion){
            if(tipoJuego == 'real')
              cantidadPuntosReal += fila[posicion-i-1] + fila[posicion-i];
            else
              cantidadPuntosPrueba += fila[posicion-i-1] + fila[posicion-i];
          }
          cantidadFusiones++;
        }
        else if(fila[posicion-i-1] == 0){
          //Desplazamos los elementos vecinos
          fila[posicion-i-1] = fila[posicion-i];
          fila[posicion-i] = 0;
        }
        else
          break;
      }
      return ultimoIndiceFusionado
    }

    //Funcion que agrupa dos elementos consecutivos en una fila y los suma
    function agruparElementos(fila, incrementarPuntuacion, tipoJuego){
      ultimoIndiceFusionado = -1;
      for(var i = 1; i<fila.length; i++){
        if(fila[i] != 0)
          ultimoIndiceFusionado = dispararAlInicio(i, fila, ultimoIndiceFusionado, incrementarPuntuacion, tipoJuego);
      }
    }

    //Funcion que desplaza los elementos de una fila hacia la izquierda
    function desplazarFilaEnDireccionIzquierda(fila, incrementarPuntuacion, tipoJuego){
      agruparElementos(fila, incrementarPuntuacion, tipoJuego);
      for(var ciclo = 0; ciclo<fila.length; ciclo++){
        for(var i = 0; i<fila.length - 1; i++){
          if(fila[i] == 0 && fila[i + 1] != 0){
            fila[i] =  fila[i + 1];
            fila[i + 1] = 0;
          }
        }
      }
    }

    //Funcion base que se usara en todos los movimientos del tablero
    function moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
      for(var fila = 0; fila<rejillaPrincipal.length; fila++){
          desplazarFilaEnDireccionIzquierda(rejillaPrincipal[fila], incrementarPuntuacion, tipoJuego)
      }
      return rejillaPrincipal;
    }

    function moverEnDireccionDerecha(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
      $TableroService.revertirRejilla(rejillaPrincipal);
      moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      $TableroService.revertirRejilla(rejillaPrincipal);
      return rejillaPrincipal;
    }

    function moverEnDireccionArriba(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
      rejillaPrincipal = $TableroService.obtenerTranspuestaRejilla(rejillaPrincipal);
      moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      rejillaPrincipal = $TableroService.obtenerTranspuestaRejilla(rejillaPrincipal);
      return rejillaPrincipal;
    }

    function moverEnDireccionAbajo(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
      rejillaPrincipal = $TableroService.obtenerTranspuestaRejilla(rejillaPrincipal);
      $TableroService.revertirRejilla(rejillaPrincipal);
      moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      $TableroService.revertirRejilla(rejillaPrincipal);
      rejillaPrincipal = $TableroService.obtenerTranspuestaRejilla(rejillaPrincipal);
      return rejillaPrincipal;
    }

    //Funcion que verifica si de ha obtenido el valor goal = 2048
    function haGanado(tablero){
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
          if(tablero[i][j] == OBJETIVO)
            return true;
        }
      }
      return false;
    }

    //Funcion que devulve true si no hay celdas vacias o celdas consecutivas iguales
    function estaInmovil(tablero){
      var verificar = null;
      for(var i = 0; i<DIMENSION; i++){
        for(var j = 0; j<DIMENSION; j++){
            verificar = (tablero[i][j] == 0) || (i>0 && tablero[i][j] == tablero[i-1][j]) || (i<4-1 && tablero[i][j] == tablero[i+1][j]) || (j>0 && tablero[i][j] == tablero[i][j-1]) || (j<4-1 && tablero[i][j] == tablero[i][j+1]);
            if(verificar)
              return false;
          }
        }
        return true;
    }

    return{
      //Funcion que mueve todo los elementos del tablero hacia la izquierda
      moverEnDireccionIzquierda: function(rejillaPrincipal, incrementarPuntuacion, tipoJuego) {
        return moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      },
      //Funcion que mueve todo los elementos del tablero hacia la derecha
      moverEnDireccionDerecha: function(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
        return moverEnDireccionDerecha(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      },
      //Funcion que mueve todo los elementos del tablero hacia arriba
      moverEnDireccionArriba: function(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
        return moverEnDireccionArriba(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      },
      //Funcion que mueve todo los elementos del tablero hacia abajo
      moverEnDireccionAbajo: function(rejillaPrincipal, incrementarPuntuacion, tipoJuego){
        return moverEnDireccionAbajo(rejillaPrincipal, incrementarPuntuacion, tipoJuego);
      },
      //Funcion que se encarga de realizar un movimiento de acuerdo a un codigo
      realizarMovimiento: function(codigo, tablero, incrementarPuntuacion, tipoJuego){
        if(codigo == 0)
          return moverEnDireccionIzquierda(tablero, incrementarPuntuacion, tipoJuego);
        else if(codigo == 1)
          return moverEnDireccionDerecha(tablero, incrementarPuntuacion, tipoJuego);
        else if(codigo == 2)
          return moverEnDireccionArriba(tablero, incrementarPuntuacion, tipoJuego);
        else
          return moverEnDireccionAbajo(tablero, incrementarPuntuacion, tipoJuego);
      },
      //Funcion que agrega un 2 o un 4 en una celda vacia
      agregarCelda: function(rejillaPrincipal, celda){
        var elementosCero = [];
        for(var i = 0; i<rejillaPrincipal.length; i++){
          for(var j = 0; j<rejillaPrincipal.length; j++){
            if(rejillaPrincipal[i][j] == 0)
              elementosCero.push([i,j]);
          }
        }
        if(elementosCero.length > 0){
          var indice = elementosCero[Math.floor(Math.random() * (elementosCero.length - 0)) + 0];
          if(celda == null){
            var probabilidad = Math.floor(Math.r&&om() * (101 - 0)) + 0;
            if(probabilidad > 90)//Habra un 10% de probabilidad de agregar un 4
              rejillaPrincipal[indice[0]][indice[1]] = 4;
            else//Habra un 90% de agregar un 2
              rejillaPrincipal[indice[0]][indice[1]] = 2;
          }
          else
            rejillaPrincipal[indice[0]][indice[1]] = celda;
          
        }
      },
      establecerPuntuacion: function(cantidad, tipoJuego){
        if(tipoJuego == 'real')
          cantidadPuntosReal += cantidad;
        else
          cantidadPuntosPrueba = cantidad;
      },
      obtenerPuntuacion: function(tipoJuego){
        if(tipoJuego == 'real')
          return cantidadPuntosReal;
        else
          return cantidadPuntosPrueba;
      },
      //Funcion que devulve True si el juego ha finalizado
      haTerminado: function(rejillaPrincipal){
        if(haGanado(rejillaPrincipal))
          return true;
        else
         return estaInmovil(rejillaPrincipal);
      }
  }
})