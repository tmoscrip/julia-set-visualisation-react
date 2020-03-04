import React, { useState } from 'react'

export const ShaderContext = React.createContext()
export const ShaderProvider = ShaderContext.Provider
export const ShaderConsumer = ShaderContext.Consumer

function ModelProvider({ children }) {
  const initModelState = {
    canvasRef: useState(null), // Canvas element used for rendering the fractal
    gl: useState(null), // WebGL context of the canvas
    julia: {
      c: {
        x: useState(0.2),
        y: useState('sin(u_time)')
      },
      complexPoly: useState('z^2 + c'), // Complex Quadratic Polynomial
      escapeRadius: useState(4.0), // TODO: Does this stay constant for every polynomial?
      maxIterations: useState(20)
    },
    viewport: {
      width: useState(3),
      height: useState(3),
      translate: {
        x: useState(0),
        y: useState(0)
      }
    },
    time: {
      startedAt: useState(Date.now()),
      paused: useState(false),
      lastPausedAt: useState(0),
      pauseDuration: useState(0),
      timeScale: useState(0.3)
    }
  }

  return <ShaderProvider value={initModelState}>{children}</ShaderProvider>
}

ModelProvider.propTypes = {}

export default ModelProvider
