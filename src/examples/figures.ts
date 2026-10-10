import { ATTRIB, createFixedFunction, LIGHTING } from '../vendor/ff/ff';
import { 
  CANVAS_SIZE, 
  CLEAR_COLOR, 
  TRIANGLE_VERTICES, 
  SQUARE_VERTICES, 
  SQUARE_INDICES, 
  POSITION_STRIDE_BYTES 
} from './shared';

export type FigureType = 'triangle' | 'square';
export type ColorType = 'red' | 'green' | 'blue';

// Diccionario de colores en formato RGB [R, G, B] para ff.setColor
const COLORS: Record<ColorType, [number, number, number]> = {
  red: [1, 0, 0],
  green: [0, 1, 0],
  blue: [0, 0, 1],
};

// Step 1. Get the WebGL2 context.
function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 is not available.');
  return gl;
}

// Step 2. Vertex specification: copy the vertex data to the GPU.
function createVertexBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

// Función auxiliar para crear el buffer de índices (Element Buffer para drawElements del cuadrado, )
function createIndexBuffer(gl: WebGL2RenderingContext, indices: Uint16Array): WebGLBuffer {
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return buffer;
}

// Step 3. Describe how the vertex data is laid out, using FF's attribute slots.
function createPositionVAO(gl: WebGL2RenderingContext, vertexBuffer: WebGLBuffer): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Habilitamos solo la posición
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, POSITION_STRIDE_BYTES, 0);

  // Deshabilitamos el color por vértice para que tome el color global de ff.setColor
  gl.disableVertexAttribArray(ATTRIB.COLOR);

  gl.bindVertexArray(null);
  return vao;
}

// Step 4. Pipeline state: canvas size, viewport, clear color.
function setupState(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(...CLEAR_COLOR);
}

// Step 5. Draw.
function drawScene(
  gl: WebGL2RenderingContext, 
  ff: ReturnType<typeof createFixedFunction>, 
  figure: FigureType, 
  colorKey: ColorType
): void {
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Asignar el color global seleccionado con ff.setColor
  const [r, g, b] = COLORS[colorKey];
  ff.setColor([r, g, b, 1]);

  if (figure === 'triangle') {
    const vertexBuffer = createVertexBuffer(gl, TRIANGLE_VERTICES);
    const vao = createPositionVAO(gl, vertexBuffer);
    
    gl.bindVertexArray(vao);
    ff.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);

  } else if (figure === 'square') {
    const vertexBuffer = createVertexBuffer(gl, SQUARE_VERTICES);
    const indexBuffer = createIndexBuffer(gl, SQUARE_INDICES);
    const vao = createPositionVAO(gl, vertexBuffer);
    
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    ff.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
  }
}

export function renderScene(canvas: HTMLCanvasElement, figure: FigureType, colorKey: ColorType): void {
  const gl = getContext(canvas);
  
  // Inicializar FixedFunction
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING); // Sin iluminación, colores planos

  setupState(gl, canvas);
  drawScene(gl, ff, figure, colorKey);
}
