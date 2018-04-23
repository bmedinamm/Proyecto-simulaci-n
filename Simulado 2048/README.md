# Simulador del juevo 2048

**Breve reseña.**

El 2048 es un juego desarrollado en marzo de 2014 por el joven desarrollador italiano
Gabriele Cirulli que alcanzó una gran popularidad.
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

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```
