angular.module('2048Simulator')
.factory('$TableroService',function(){
    var puntuacion = 0;
    
    function dispararAlInicio(posicion, fila, ultimoIndiceFusionado, incrementarPuntuacion){
      //posicion = 2
      for(var i = 0; i < posicion; i++){
        if(fila[posicion - 1 - i] == fila[posicion - i] && ultimoIndiceFusionado != posicion-i-1){
          //Fusionamos los elementos vecinos
          fila[posicion-i-1] = fila[posicion-i-1] + fila[posicion-i];
          fila[posicion-i] = 0;
          ultimoIndiceFusionado = posicion-i-1;
          if(incrementarPuntuacion)
            puntuacion += fila[posicion-i-1] + fila[posicion-i];
          //break;
        }
        else if(fila[posicion-i-1] == 0){
          //Desplazamos los elementos vecinos
          fila[posicion-i-1] = fila[posicion-i];
          fila[posicion-i] = 0;
        }
        else{
          //Salimos
          break;
        }
      }
      return ultimoIndiceFusionado
    }

    //Funcion que agrupa dos elementos consecutivos en una fila y los suma
    function agruparElementos(fila, incrementarPuntuacion){
      ultimoIndiceFusionado = -1;
      for(var i = 1; i<fila.length; i++){
        if(fila[i] != 0)
          ultimoIndiceFusionado = dispararAlInicio(i, fila, ultimoIndiceFusionado, incrementarPuntuacion);
      }

    }

    //Funcion que desplaza los elementos de una fila hacia la izquierda
    function desplazarFilaEnDireccionIzquierda(fila, incrementarPuntuacion){
      agruparElementos(fila,incrementarPuntuacion);
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
    function moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion){
      for(var fila = 0; fila<rejillaPrincipal.length; fila++){
          desplazarFilaEnDireccionIzquierda(rejillaPrincipal[fila], incrementarPuntuacion)
      }
    }

    //Funcion que revierte una fila
    function revertirFila(fila){
      var tamanio = fila.length;
      for(var i = 0; i<tamanio/2; i++){
        celda = fila[i];
        fila[i] = fila[tamanio - i - 1];
        fila[tamanio - i - 1] = celda;
      }
    }

    //Funcion que revierte una matriz
    function revertirRejilla(rejillaPrincipal){
      for(var i = 0; i<rejillaPrincipal.length; i++)
        revertirFila(rejillaPrincipal[i]);
    }

    //Funcion que obtiene la trasnpuesta de una matriz
    function obtenerTranspuestaRejilla(rejillaPrincipal){
      var rejillaTemporal = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      for(var i = 0; i<rejillaPrincipal.length; i++){
        for(var j = 0; j<rejillaPrincipal.length; j++){
          rejillaTemporal[j][i] = rejillaPrincipal[i][j];
        }
      }
      return rejillaTemporal;
    }
    
    return{
      //Funcion que agrega un 2 o un 4 en una celda vacia
      agregarNumero: function(rejillaPrincipal){
        var elementosCero = [];

        for(var i = 0; i<rejillaPrincipal.length; i++){
          for(var j = 0; j<rejillaPrincipal.length; j++){
            if(rejillaPrincipal[i][j] == 0)
              elementosCero.push([i,j]);
          }
        }

        if(elementosCero.length > 0){
          var indice = elementosCero[Math.floor(Math.random() * (elementosCero.length - 0)) + 0];
          var probabilidad = Math.floor(Math.random() * (101 - 0)) + 0;
          if(probabilidad > 90)//Habra un 10% de probabilidad de agregar un 4
            rejillaPrincipal[indice[0]][indice[1]] = 4;
          else//Habra un 90% de agregar un 2
            rejillaPrincipal[indice[0]][indice[1]] = 2;
          
        }
      },
      //Funcion que mueve todo los elementos del tablero hacia la izquierda
      moverEnDireccionIzquierda: function(rejillaPrincipal, incrementarPuntuacion) {
        moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion);
      },
      //Funcion que mueve todo los elementos del tablero hacia la derecha
      moverEnDireccionDerecha: function(rejillaPrincipal, incrementarPuntuacion){
        revertirRejilla(rejillaPrincipal);
        moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion);
        revertirRejilla(rejillaPrincipal);
      },
      //Funcion que mueve todo los elementos del tablero hacia arriba
      moverEnDireccionArriba: function(rejillaPrincipal, incrementarPuntuacion){
        rejillaPrincipal = obtenerTranspuestaRejilla(rejillaPrincipal);
        moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion);
        rejillaPrincipal = obtenerTranspuestaRejilla(rejillaPrincipal);
        return rejillaPrincipal;
      },
      //Funcion que mueve todo los elementos del tablero hacia abajo
      moverEnDireccionAbajo: function(rejillaPrincipal, incrementarPuntuacion){
        rejillaPrincipal = obtenerTranspuestaRejilla(rejillaPrincipal);
        revertirRejilla(rejillaPrincipal);
        moverEnDireccionIzquierda(rejillaPrincipal, incrementarPuntuacion);
        revertirRejilla(rejillaPrincipal);
        rejillaPrincipal = obtenerTranspuestaRejilla(rejillaPrincipal);
        return rejillaPrincipal;
      }
    }
})