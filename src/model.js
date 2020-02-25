export const initModelState = {
  canvas: null, // Canvas element used for rendering the fractal
  gl: null, // WebGL context of the canvas
  julia: {
    c: {
      x: 0,
      y: 0,
    },
    cqp: 'z^2 + c', // Complex Quadratic Polynomial
    escapeRadius: 4.0,
    maxIterations: 40
  },
  viewport: {
    width: 3,
    height: 3,
    translate: {
      x: 0,
      y: 0,
    },
  },
  time: {
    startedAt: Date.now(),
    paused: false,
    lastPausedAt: 0,
    pauseDuration: 0,
    timeScale: 0.3,
  }
}