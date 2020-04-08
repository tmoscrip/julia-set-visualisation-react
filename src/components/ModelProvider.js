import React, { useState } from 'react'
import { isUseStateArray } from './../helpers'
import { PropTypes } from 'prop-types'

export const ShaderContext = React.createContext()
export const ShaderProvider = ShaderContext.Provider
export const ShaderConsumer = ShaderContext.Consumer

/*
  Take object from context and extract the values for each setState array
  Recurse down if possilble and maintain k:v structure

  Keeps object structure, but converts [state, setState]
  Arrays to just the state value
*/
export function contextToValueObject(obj) {
  const valuesObj = {}
  for (let key in obj) {
    if (isUseStateArray(obj[key])) {
      valuesObj[key] = obj[key][0]
    } else {
      // TODO: Add check on recursion case
      // Function seems to be recursing into DOM refs
      // leading to stack overflows (only when deployed)
      valuesObj[key] = contextToValueObject(obj[key])
    }
  }

  return valuesObj
}

// Inverse of contextToValueObject
// Takes an object and attempts to move values from
// it into context's state through setState
export function loadObjectIntoContext(obj, ctx) {
  for (const item in obj) {
    if (isUseStateArray(ctx[item])) {
      // Call setState in ctx for each key in obj
      const setState = ctx[item][1]
      setState(obj[item])
    } else {
      loadObjectIntoContext(obj[item], ctx[item])
    }
  }
}

function ModelProvider({ children }) {
  const initModelState = {
    canvasRef: useState(null), // Canvas element used for rendering the fractal
    gl: useState(null), // WebGL context of the canvas
    julia: {
      coefficients: useState('c, 2/3, -4*c/3, 0 , 0, 1'),
      c: {
        x: useState('0.1-cos(u_time)'),
        y: useState('0.4-sin(u_time/2)'),
      },
      maxIterations: useState('20'),
      escapeRadius: useState('200'),
      useSmoothing: useState(true),
      msaa: useState('2x'),
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
          position: '0.3',
        },
        {
          hex: '#FFFF00',
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
      elapsed: useState(0),
      timeScale: useState('1'),
    },
  }

  return <ShaderProvider value={initModelState}>{children}</ShaderProvider>
}

ModelProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModelProvider
