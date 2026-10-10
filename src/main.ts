import './style.css';
import { renderScene, FigureType, ColorType } from './examples/figures';

let currentFigure: FigureType = 'triangle';
let currentColor: ColorType = 'red';

const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement;
const btnFigure = document.getElementById('btn-figure')!;
const btnColor = document.getElementById('btn-color')!;

function updateUI() {
  // 1. Renderizar la figura actual con el color global persistente
  renderScene(canvas, currentFigure, currentColor);

  // 2. Actualizar el texto dentro de los botones superiores
  btnFigure.textContent = `Shape: ${currentFigure}`;
  btnColor.textContent = `Color: ${currentColor}`;
}

// Evento del botón de figura (Ciclo: triángulo -> cuadrado -> hexágono -> círculo -> triángulo)
btnFigure.addEventListener('click', () => {
  if (currentFigure === 'triangle') currentFigure = 'square';
  else if (currentFigure === 'square') currentFigure = 'hexagon';
  else if (currentFigure === 'hexagon') currentFigure = 'circle';
  else currentFigure = 'triangle';

  updateUI();
});

// Evento del botón de color (Ciclo: rojo -> verde -> azul -> rojo)
// El color persiste de forma global al cambiar de figura.
btnColor.addEventListener('click', () => {
  if (currentColor === 'red') currentColor = 'green';
  else if (currentColor === 'green') currentColor = 'blue';
  else currentColor = 'red';

  updateUI();
});

// Inicialización de la página (Arranca con triángulo en rojo)
updateUI();
