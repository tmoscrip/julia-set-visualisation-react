import React, { useRef, useEffect, useContext, useState } from 'react'
import { glDrawFrame } from '../webgl'
import { ShaderContext, contextToValueObject } from './ModelProvider'
import DebugFrame from './DebugFrame'
import ControlPanel from './ControlPanel/ControlPanel'

export default function ShaderCanvas() {
  const ctx = useContext(ShaderContext)

  const [canvasRef, setCanvasRef] = ctx.canvasRef
  const [gl, setGl] = ctx.gl
  const [paused] = ctx.time.paused

  const canvasRefTemp = useRef()
  const animateRef = useRef()
  const [frameCount, setFrameCount] = useState(0)
  const [lastFrameTime, setLastFrameTime] = useState(0)

  const [dragStart, setDragStart] = useState()

  // Initialise canvas and webgl
  useEffect(() => {
    setCanvasRef(canvasRefTemp.current)
    setGl(canvasRefTemp.current.getContext('webgl'))
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

  function startDrag(e) {
    console.log('start drag')
    const dragStart = [e.clientX, e.clientY]
    console.log(dragStart)
    setDragStart(dragStart)
  }

  function endDrag(e) {
    console.log('end drag')
    const canvas = document.getElementsByClassName('glcanvas')[0]
    console.log(canvas)
    const [canvasWidth, canvasHeight] = [
      canvas.offsetWidth, canvas.offsetHeight
    ]
    const [startX, startY] = dragStart
    const [width, height] = [e.clientX - startX, e.clientY - startY]
    console.log(width, height)
    console.log(width/canvasWidth, height/canvasHeight)

  }

  return (
    <>
      <canvas
        className='glcanvas'
        width='1000'
        height='1000'
        onMouseDown={startDrag}
        onMouseUp={endDrag}
        ref={canvasRefTemp}
      />
      <ControlPanel>
        <DebugFrame frameCount={frameCount} frameTime={Date.now() - lastFrameTime} />
      </ControlPanel>
    </>
  )
}
