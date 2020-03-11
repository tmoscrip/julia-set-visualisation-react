import React, { useRef, useEffect, useContext, useState } from 'react'
import { glDrawFrame } from '../webgl'
import { ShaderContext, contextToValueObject } from './ModelProvider'
import DebugFrame from './DebugFrame'
import ControlPanel from './ControlPanel/ControlPanel'

export default function ShaderCanvas() {
  const ctx = useContext(ShaderContext)

  const [, setCanvasRef] = ctx.canvasRef
  const [gl, setGl] = ctx.gl
  const [paused] = ctx.time.paused

  const canvasRef = useRef()
  const animateRef = useRef()
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
      animateRef.current = requestAnimationFrame(animate)
    }

    // Start frame requests
    animateRef.current = requestAnimationFrame(animate)

    // Return cleanup as callback
    return () => cancelAnimationFrame(animateRef.current)
  }, [ctx, paused, gl])

  return (
    <>
      <canvas className='glcanvas' width='1000' height='1000' ref={canvasRef} />
      <ControlPanel>
        <DebugFrame frameCount={frameCount} frameTime={Date.now() - lastFrameTime} />
      </ControlPanel>
    </>
  )
}
