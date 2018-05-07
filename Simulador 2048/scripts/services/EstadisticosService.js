angular.module('2048Simulator')
.factory('$EstadisticosService',function($firebaseObject, $firebaseArray){
    var estadisticosDeHeuristicas = $firebaseObject(firebase.database().ref('/estadisticosDeHeuristicas'));
    console.log(estadisticosDeHeuristicas);
    
    function actualizarMovimientosPromediosParaPotencias(heuristica, nivelProfundidad, potencia, cantidadEstados){
        var valorPromedio = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromediosParaPotencias'][potencia];
        var totalPartidasGanadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasGanadas'];
        estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromediosParaPotencias'][potencia] = Math.round((valorPromedio*totalPartidasGanadas + cantidadEstados)/(totalPartidasGanadas + 1));
        estadisticosDeHeuristicas.$save();
    }

    return{
        obtenerEstadisticosDeHeuristicas: function(){
            return estadisticosDeHeuristicas;
        },
        incrementarTotalPartidasJugadas: function(heuristica, nivelProfundidad){
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasJugadas'] += 1;
            estadisticosDeHeuristicas.$save();
        },
        incrementarTotalPartidasGanadas: function(heuristica, nivelProfundidad){
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasGanadas'] += 1;
            estadisticosDeHeuristicas.$save();
        },
        incrementarTotalPartidasPerdidas: function(heuristica, nivelProfundidad){
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasPerdidas'] += 1;
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientoPromedioGanarPartida: function(heuristica, nivelProfundidad, cantidadEstados){
            var movimientoPromedioGanarPartida = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientoPromedioGanarPartida'];
            var totalPartidasGanadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasGanadas'];
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientoPromedioGanarPartida'] = Math.round((movimientoPromedioGanarPartida*totalPartidasGanadas + cantidadEstados)/(totalPartidasGanadas + 1));
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientosPromedioIzquierdo: function(heuristica, nivelProfundidad, cantidadEstados){
            var movimientosPromedioIzquierdo = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioIzquierdo'];
            var totalPartidasJugadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasJugadas'];
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioIzquierdo'] = Math.round((movimientosPromedioIzquierdo*totalPartidasJugadas + cantidadEstados)/(totalPartidasJugadas + 1));
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientosPromedioDerecho: function(heuristica, nivelProfundidad, cantidadEstados){
            var movimientosPromedioDerecho = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioDerecho'];
            var totalPartidasJugadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasJugadas'];
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioDerecho'] = Math.round((movimientosPromedioDerecho*totalPartidasJugadas + cantidadEstados)/(totalPartidasJugadas + 1));
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientosPromedioArriba: function(heuristica, nivelProfundidad, cantidadEstados){
            var movimientosPromedioArriba = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioArriba'];
            var totalPartidasJugadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasJugadas'];
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioArriba'] = Math.round((movimientosPromedioArriba*totalPartidasJugadas + cantidadEstados)/(totalPartidasJugadas + 1));
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientosPromedioAbajo: function(heuristica, nivelProfundidad, cantidadEstados){
            var movimientosPromedioAbajo = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioAbajo'];
            var totalPartidasJugadas = estadisticosDeHeuristicas[heuristica][nivelProfundidad]['totalPartidasJugadas'];
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['movimientosPromedioAbajo'] = Math.round((movimientosPromedioAbajo*totalPartidasJugadas + cantidadEstados)/(totalPartidasJugadas + 1));
            estadisticosDeHeuristicas.$save();
        },
        actualizarMovimientosPromediosParaPotencias: function(heuristica, nivelProfundidad, listaPotencias){
            for(i = 0; i<listaPotencias.length; i++)
                actualizarMovimientosPromediosParaPotencias(heuristica, nivelProfundidad, 'potencia'+listaPotencias[i].potencia, listaPotencias[i].cantidadEstados);
        },
        incrementarPartidasPerdidasDePotencia: function(heuristica, nivelProfundidad, potencia){
            estadisticosDeHeuristicas[heuristica][nivelProfundidad]['partidasPerdidasPorPotencia'][potencia]++;
            estadisticosDeHeuristicas.$save();
        },
        guardarPartida: function(partida){
            $firebaseArray(firebase.database().ref('/listaPartidas').limitToFirst(1)).$loaded()
            .then(function(listaPartidas){
                listaPartidas.$add(partida);
            })
        }
    }
})