import React, { useRef, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { glDrawFrame } from '../webgl'
import { ShaderContext } from './ModelProvider'
import DebugFrame from './DebugFrame'

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
const contextToValueObject = function(obj) {
  // B
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

export default function ShaderCanvas({ width, height }) {
  const ctx = useContext(ShaderContext)

  const setCanvasRef = ctx.canvasRef[1] // Second item in setState array
  const [gl, setGl] = ctx.gl
  const paused = ctx.time.paused[0]

  const canvasRef = useRef()
  const requestRef = useRef()
  const [frameCount, setFrameCount] = useState(0)
  const [lastFrameTime, setLastFrameTime] = useState(0)

  // Initialise canvas and webgl
  useEffect(() => {
    setCanvasRef(canvasRef.current)
    setGl(canvasRef.current.getContext('webgl'))
  }, [setCanvasRef, setGl])

  // Start rendering
  useEffect(() => {
    // Define function to be run on every frame render
    const animate = () => {
      if (paused === false && gl !== null) {
        setLastFrameTime(Date.now())
        const glObj = contextToValueObject(ctx)
        glDrawFrame(glObj)
        setFrameCount(frameCount => frameCount + 1)
      }

      // The frame request runs itself recursively
      requestRef.current = requestAnimationFrame(animate)
    }

    // Start frame requests
    requestRef.current = requestAnimationFrame(animate)

    // Return cleanup as callback
    return () => cancelAnimationFrame(requestRef.current)
  }, [ctx, paused, gl])

  return (
    <div>
      <canvas className='glcanvas' ref={canvasRef} width={width} height={height} />
      <DebugFrame frameCount={frameCount} frameTime={Date.now() - lastFrameTime} />
    </div>
  )
}

ShaderCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}
