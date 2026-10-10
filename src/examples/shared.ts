export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

export const CANVAS_SIZE = 480;

// 1. Triángulo (solo posiciones X, Y, Z, en orden antihorario CCW)
export const TRIANGLE_VERTICES = new Float32Array([
   0.0,  0.7, 0.0, // vertice superior en el medio
  -0.7, -0.6, 0.0, // vertice inferior izquierdo
   0.7, -0.6, 0.0, // vertice inferior derecho
]);

// 2. Cuadrado: 4 vértices (posiciones X, Y, Z)
export const SQUARE_VERTICES = new Float32Array([
  -0.5,  0.5, 0.0, // vertice superior izquierdo (0)
  -0.5, -0.5, 0.0, // vertice inferior izquierdo (1)
   0.5, -0.5, 0.0, // vertice inferior derecho (2)
   0.5,  0.5, 0.0, // vertice superior derecho (3)
]);

// 3. Cuadrado: 6 índices (formando dos triángulos en sentido antihorario CCW)
export const SQUARE_INDICES = new Uint16Array([
  0, 1, 2, // Primer triángulo (superior-izq -> inferior-izq -> inferior-der)
  0, 2, 3  // Segundo triángulo (sup-izq -> inferior-der -> superior-der)
]);

// Como ya no hay colores por vértice, el stride es solo de 3 floats (12 bytes)
export const POSITION_STRIDE_BYTES = 3 * 4;
