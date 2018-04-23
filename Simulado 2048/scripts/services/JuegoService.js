angular.module('2048Simulator')
.factory('$JuegoService',function(){
    var cantidadPuntos = 0;
    
    return{
      incrementarCantidadPuntos: function(cantidad){
        cantidadPuntos += cantidad;
      }
    }
})