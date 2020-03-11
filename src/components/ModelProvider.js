import React, { useState } from 'react'

export const ShaderContext = React.createContext()
export const ShaderProvider = ShaderContext.Provider
export const ShaderConsumer = ShaderContext.Consumer

/*
  Take object from context and extract the values for each setState array
  Recurse down if possilble and maintain k:v structure
*/

// Check to see if array has useState set function within
const hasSetState = item => {
  return typeof item[1] === 'function' && item[1].name === 'bound dispatchAction'
}

// Is the item a useState array?
// Perform checks on requirements for hasSetState beforehand
const isUseState = item => {
  return Array.isArray(item) && item.length === 2 && hasSetState(item)
}

// Flattens out a object from the state context
// Keeps object structure, but converts [state, setState]
// Arrays to just the state value
export function contextToValueObject(obj) {
  const namesObject = {}

  for (const item in obj) {
    if (isUseState(obj[item])) {
      namesObject[item] = obj[item][0]
    } else {
      namesObject[item] = contextToValueObject(obj[item])
    }
  }

  return namesObject
}

export function loadObjectIntoContext(obj, ctx) {
  for (const item in obj) {
    if (isUseState(ctx[item])) {
      // Call setState in ctx for each key in obj
      const setState = ctx[item][1]
      setState(obj[item])
    } else {
      // Recurse
      loadObjectIntoContext(obj[item], ctx[item])
    }
  }
}

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
      width: useState('3.'),
      height: useState('3.'),
      translate: {
        x: useState('0.'),
        y: useState('0.')
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
