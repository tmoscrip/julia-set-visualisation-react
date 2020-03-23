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
  /*
  Ints are not implictly cast to floats in WebGL, any value which is passed to
  WebGL code for use as a float must contain a decimal point

  This function appends a period to any int to avoid type errors once it's passed
  into WebGL code
*/
  function useWebGlState(initValue) {
    const [value, setValue] = useState(initValue)

    // Returns the state value with problematic ints converted to floats
    function fixedFloats() {
      const intRegex = new RegExp('^(\\+|-)?\\d+$')

      const trimmed = value.trim()

      // Case 1: plain int
      if (intRegex.test(trimmed)) {
        return trimmed.concat('.')
      }

      // TODO: Case 2: equation string

      return trimmed
    }

    return [value, setValue, fixedFloats]
  }

  const initModelState = {
    canvasRef: useState(null), // Canvas element used for rendering the fractal
    gl: useState(null), // WebGL context of the canvas
    julia: {
      c: {
        x: useState('0.2'),
        y: useState('sin(u_time)'),
      },
      complexPoly: useState('z^2 + c'), // Complex Quadratic Polynomial
      escapeRadius: useState('4.0'), // TODO: Does this stay constant for every polynomial?
      maxIterations: useState('100'),
      useSmoothing: useState(true),
    },
    viewport: {
      width: useState('4.5'),
      height: useState('4.5'),
      translate: {
        x: useState('0.'),
        y: useState('0.'),
      },
      lockAspectRatio: useState(true),
    },
    colorMap: [
      { color: useState([6, 0.1, 0.7]), position: useState(0) },
      { color: useState([1, 0.9, 0]), position: useState(1) },
    ],
    time: {
      startedAt: useState(Date.now()),
      paused: useState(false),
      lastPausedAt: useState(0),
      pauseDuration: useState(0),
      timeScale: useState('0.3'),
    },
  }

  return <ShaderProvider value={initModelState}>{children}</ShaderProvider>
}

ModelProvider.propTypes = {}

export default ModelProvider
