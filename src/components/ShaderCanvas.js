import React, { useRef, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { glDrawFrame } from '../webgl'
import { ShaderContext, contextToValueObject } from './ModelProvider'
import DebugFrame from './DebugFrame'
import ControlPanel from './ControlPanel/ControlPanel'



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
    <>
      <canvas className='glcanvas' ref={canvasRef} />
      <ControlPanel>
        <DebugFrame frameCount={frameCount} frameTime={Date.now() - lastFrameTime} />
      </ControlPanel>
    </>
  )
}

ShaderCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}
