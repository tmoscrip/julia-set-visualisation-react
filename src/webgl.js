import { buildFragCode, vertCode } from './webgl/julia'

//
// WebGL initialisation and render loop
// Code adapted from https://observablehq.com/@tomktjemsland/simple-webgl
//

// Define a square composed of two triangles
const vertices = [-1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0]
// Index vertices in groups of 3
const indices = [3, 2, 1, 3, 1, 0]

function bindVertices(gl) {
  // Create an empty buffer object to store vertex buffer
  const vertexBuffer = gl.createBuffer()
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return vertexBuffer
}

function bindIndices(gl) {
  // Create an empty buffer object to store Index buffer
  const indexBuffer = gl.createBuffer()
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
  // Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

  return indexBuffer
}

function createProgram(gl, fragCode) {
  // Create a vertex shader object
  const vertShader = gl.createShader(gl.VERTEX_SHADER)

  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode)

  // Compile the vertex shader
  gl.compileShader(vertShader)

  // Create fragment shader object
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)

  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode)

  // Compile the fragmentt shader
  gl.compileShader(fragShader)

  // Create a shader program object to
  // store the combined shader program
  const shaderProgram = gl.createProgram()

  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader)

  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader)

  // Link both the programs
  gl.linkProgram(shaderProgram)

  // Use the combined shader program object
  gl.useProgram(shaderProgram)

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragShader))
    console.log(fragCode)
  }

  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertShader))
  }

  return shaderProgram
}

function setUniforms(shaderProgram, ctx) {
  const { canvasRef, gl, julia, time, viewport } = ctx
  const { escapeRadius, maxIterations } = julia

  const escapeRadiusUniform = gl.getUniformLocation(shaderProgram, 'u_escapeRadius')
  gl.uniform1f(escapeRadiusUniform, escapeRadius)

  const maxIterationsUniform = gl.getUniformLocation(shaderProgram, 'u_maxIterations')
  gl.uniform1i(maxIterationsUniform, maxIterations)

  const resolutionUniform = gl.getUniformLocation(shaderProgram, 'u_resolution')
  gl.uniform2fv(resolutionUniform, [canvasRef.width, canvasRef.height])

  const startedAtUniform = gl.getUniformLocation(shaderProgram, 'u_time')
  const secondsSinceStart = (getMillisElapsed(time.startedAt, time.pauseDuration) / 1000) * time.timeScale
  gl.uniform1f(startedAtUniform, secondsSinceStart)

  const widthUniform = gl.getUniformLocation(shaderProgram, 'u_width')
  gl.uniform1f(widthUniform, viewport.width)

  const heightUniform = gl.getUniformLocation(shaderProgram, 'u_height')
  gl.uniform1f(heightUniform, viewport.height)

  const xTranslateUniform = gl.getUniformLocation(shaderProgram, 'u_translatex')
  gl.uniform1f(xTranslateUniform, viewport.translate.x)

  const yTranslateUniform = gl.getUniformLocation(shaderProgram, 'u_translatey')
  gl.uniform1f(yTranslateUniform, viewport.translate.y)
}

function getMillisElapsed(startedAt, pauseDuration) {
  return Date.now() - startedAt - pauseDuration
}

export function glDrawFrame(ctx) {
  const { canvasRef, gl } = ctx
  console.log(canvasRef)

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    return
  }

  // Construct the final version of the fragment shader code
  const fragCode = buildFragCode(ctx)

  const vertexBuffer = bindVertices(gl)
  const indexBuffer = bindIndices(gl)
  const shaderProgram = createProgram(gl, fragCode)
  setUniforms(shaderProgram, ctx)

  /*======= Associating shaders to buffer objects =======*/
  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

  // Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

  // Get the attribute location
  const coord = gl.getAttribLocation(shaderProgram, 'coordinates')

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)

  // Enable the attribute
  gl.enableVertexAttribArray(coord)

  /*============= Drawing the Quad ================*/
  // Clear the canvas
  gl.clearColor(0, 0, 0, 1)

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST)

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Set the view port
  gl.viewport(0, 0, canvasRef.width, canvasRef.height)

  // Draw the triangles
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}
