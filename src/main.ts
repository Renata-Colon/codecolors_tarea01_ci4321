import './style.css';
import { renderScene, FigureType, ColorType } from './examples/figures';

let currentFigure: FigureType = 'triangle';
let currentColor: ColorType = 'red';

const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement;
const btnFigure = document.getElementById('btn-figure')!;
const btnColor = document.getElementById('btn-color')!;

// colores en formato css para el botón 
const cssColors: Record<ColorType, string> = {
  red: '#ef4444',    // rojo
  green: '#22c55e',  // verde
  blue: '#3b82f6',   // azul
};

// nombres en español para el botón de figura
const figureNames: Record<FigureType, string> = {
  triangle: 'triángulo',
  square: 'cuadrado',
  hexagon: 'hexágono',
  circle: 'círculo'
};

function updateUI() {
  // 1. renderizar la figura actual con el color global
  renderScene(canvas, currentFigure, currentColor);

  // 2. actualizar el texto del botón de figura
  btnFigure.textContent = `figura: ${figureNames[currentFigure]}`;

  // 3. actualizar el color de fondo del botón de color 
  btnColor.style.backgroundColor = cssColors[currentColor];
  btnColor.title = `color actual: ${currentColor}`; // por accesibilidad
}

// evento del botón de figura
btnFigure.addEventListener('click', () => {
  if (currentFigure === 'triangle') currentFigure = 'square';
  else if (currentFigure === 'square') currentFigure = 'hexagon';
  else if (currentFigure === 'hexagon') currentFigure = 'circle';
  else currentFigure = 'triangle';

  updateUI();
});

// evento del botón de color
btnColor.addEventListener('click', () => {
  if (currentColor === 'red') currentColor = 'green';
  else if (currentColor === 'green') currentColor = 'blue';
  else currentColor = 'red';

  updateUI();
});

// inicialización de la página
updateUI();