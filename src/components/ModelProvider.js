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
  return typeof item[1] === 'function' && item[1].name.startsWith('bound ')
}

// Is the item a useState array?
// Perform checks on requirements for hasSetState beforehand
const isUseState = item => {
  return Array.isArray(item) && item.length === 2 && hasSetState(item)
}

// Keeps object structure, but converts [state, setState]
// Arrays to just the state value
export function contextToValueObject(obj) {
  const valuesObj = {}
  for (let item in obj) {
    if (isUseState(obj[item])) {
      valuesObj[item] = obj[item][0]
    } else {
      // TODO: Add check on recursion case
      // Function seems to be recursing into DOM refs
      // leading to stack overflows (only when deployed)
      valuesObj[item] = contextToValueObject(obj[item])
    }
  }

  return valuesObj
}

// Inverse of contextToValueObject
// Takes an object and attempts to move values from
// it into context's state through setState
export function loadObjectIntoContext(obj, ctx) {
  for (const item in obj) {
    if (isUseState(ctx[item])) {
      // Call setState in ctx for each key in obj
      const setState = ctx[item][1]
      setState(obj[item])
    } else {
      // TODO: Add check on recursion case
      // Function seems to be recursing into DOM refs
      // leading to stack overflows (only when deployed)
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
        x: useState('-0.2'),
        y: useState('0.4*cos(u_time) + sin(u_time)'),
      },
      coefficients: useState('1/2, 2/3, 0 , 0, 1'),
      escapeRadius: useState('20'),
      maxIterations: useState('50'),
      useSmoothing: useState(true),
    },
    viewport: {
      width: useState('7'),
      height: useState('7'),
      translate: {
        x: useState('0'),
        y: useState('0'),
      },
      lockAspectRatio: useState(true),
    },
    color: {
      colorPoints: useState([
        {
          hex: '#000000',
          position: '0',
        },
        {
          hex: '#FF0000',
          position: '1.0',
        },
      ]),
      curve: useState('linear'),
      colorModel: useState('RGB'),
      textureData: useState([255, 255, 255]),
    },
    time: {
      startedAt: useState(Date.now()),
      paused: useState(false),
      lastPausedAt: useState(0),
      pauseDuration: useState(0),
      timeScale: useState('0.5'),
    },
  }

  return <ShaderProvider value={initModelState}>{children}</ShaderProvider>
}

ModelProvider.propTypes = {}

export default ModelProvider
