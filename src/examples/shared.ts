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

// 4. Hexágono: 8 vértices para usar con TRIANGLE_FAN (1 centro + 6 perímetro + 1 para cerrar)
// orden CCW: empezamos a la derecha y subimos
export const HEXAGON_VERTICES = new Float32Array([
   0.0,    0.0,   0.0, // 0: centro
   0.6,    0.0,   0.0, // 1: derecha 
   0.3,   0.52, 0.0, // 2: arriba-der 
  -0.3,   0.52, 0.0, // 3: arriba-izq 
  -0.6,    0.0,   0.0, // 4: izquierda 
  -0.3,  -0.52, 0.0, // 5: abajo-izq 
   0.3,  -0.52, 0.0, // 6: abajo-der 
   0.6,    0.0,   0.0  // 7: repetimos el primero para cerrar 
]);

// 5. Función para generar el círculo dinámicamente según SEGMENTS
export function generateCircleVertices(segments: number): Float32Array {
  const vertices: number[] = [0.0, 0.0, 0.0]; // Siempre empezamos con el centro
  const radius = 0.6;
  
  // Generamos los puntos del perímetro en sentido antihorario 
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    vertices.push(x, y, 0.0);
  }
  
  return new Float32Array(vertices);
}

// Como ya no hay colores por vértice, el stride es solo de 3 floats (12 bytes)
export const POSITION_STRIDE_BYTES = 3 * 4;
