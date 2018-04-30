# Simulador 2048 Game

**Breve reseña.**

El 2048 es un juego desarrollado en marzo de 2014 por el joven desarrollador italiano
[Gabriele Cirulli](https://gabrielecirulli.com/) que alcanzó una gran popularidad.
El objetivo del juego es conseguir una casilla cuyo valor sea 2048, de ahí su nombre,
deslizando y combinando las casillas del tablero.
En su versión original, el tablero contiene 4x4 casillas las cuales, a su vez, contienen
un número, de manera que las casillas tendrán distintos colores dependiendo del
número que contengan.

Inicialmente el tablero contendrá sólo dos casillas, con valor 2 o 4. A partir de ellas
podremos hacer algún movimiento hacia alguna dirección.
Mediante las teclas de dirección del teclado podemos mover las casillas, deslizándolas
por la cuadrícula. De esta manera podemos mover las casillas deslizándolas hacia
posiciones vacías.

Si dos casillas de igual valor colisionan en un movimiento se combinan en una nueva
casilla cuyo valor será la suma de los valores colisionados. Por ejemplo, si dos
baldosas con el número 8 colisionan, se formará una con valor 16.
Después de realizar un movimiento aparece una casilla nueva en un lugar vacío del
tablero, que contendrá el número 2 (en un 90% de los casos) o el número 4 (en el 10%
restante).
Se acumula una puntuación, que comienza en cero y se incrementa al combinar dos
casillas, con el valor de dicha combinación. 

## Cómo usarlo

Para clonar y correr este proyecto usted necesita [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/) (el cual viene con [npm](http://npmjs.com)) instalado en su computadora. En su linea de comando realizar lo siguiente:

```bash
# Clone este repositorio
git clone https://github.com/bmedinamm/Proyecto-simulacion.git
# Vaya al directorio creado
cd Simulador 2048
# Instale todas las dependencias
npm install
# Ejecute el aplicativo con
npm start
```
