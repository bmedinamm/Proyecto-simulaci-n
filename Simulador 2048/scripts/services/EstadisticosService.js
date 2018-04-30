angular.module('2048Simulator')
.factory('$EstadisticosService',function($firebaseObject){
    var estadisticosExpectiMax = $firebaseObject(firebase.database().ref('/estadisticosExpectiMax'));
    var estadisticosPersonas = $firebaseObject(firebase.database().ref('/estadisticosPersonas'));
    return{
        obtenerEstadisticosExpectiMax: function(){
            return estadisticosExpectiMax;
        },
        obtenerEstadisticosPersonas: function(){
            return estadisticosPersonas;
        }
    }
})