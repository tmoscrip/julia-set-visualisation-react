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
    const loc = [e.clientX, e.clientY]
    console.log('drag start: ' + loc)
    setDragStart(loc)
  }

  // Translate position values from the canvas to xy-coordinates on the grid
  function canvasToGrid({ x, y }) {
    const canvas = document.getElementsByClassName('glcanvas')[0]
    const [canvasWidth, canvasHeight] = [canvas.offsetWidth, canvas.offsetHeight]

    const gridWidth = parseFloat(ctx.viewport.width[0])
    const gridHeight = parseFloat(ctx.viewport.height[0])

    const widthScale = gridWidth / canvasWidth
    const heightScale = gridHeight / canvasHeight

    const translateX = parseFloat(ctx.viewport.translate.x[0])
    const translateY = parseFloat(ctx.viewport.translate.y[0])

    const res = {
      x: -gridWidth / 2 + x * widthScale + translateX,
      y: -gridHeight / 2 + y * heightScale + translateY,
    }

    return res
  }

  function endDrag(e) {
    const setTranslateX = ctx.viewport.translate.x[1]
    const setTranslateY = ctx.viewport.translate.y[1]
    const setViewportWidth = ctx.viewport.width[1]
    const setViewportHeight = ctx.viewport.height[1]

    const dragEnd = [e.clientX, e.clientY]
    console.log('drag end: ' + dragEnd)
    const canvas = document.getElementsByClassName('glcanvas')[0]
    const [canvasWidth, canvasHeight] = [canvas.offsetWidth, canvas.offsetHeight]
    console.log('canvas dimensions:', canvasWidth, canvasHeight)

    // y values subtracted from canvas height to get correct locations
    // canvas dimensions are measured from top left, need to start from bottom left
    // as that's what our grid starts from
    const dragBox = {
      x1: dragStart[0],
      x2: dragEnd[0],
      y1: canvas.offsetHeight - dragStart[1],
      y2: canvas.offsetHeight - dragEnd[1],
    }
    console.log(dragBox)
    const dragCenterCanvas = { x: (dragBox.x1 + dragBox.x2) / 2, y: (dragBox.y1 + dragBox.y2) / 2 }
    console.log(dragCenterCanvas)
    const dragCenterGrid = canvasToGrid(dragCenterCanvas)

    setTranslateX(dragCenterGrid.x)
    setTranslateY(dragCenterGrid.y)

    const viewportWidth = parseFloat(ctx.viewport.width)
    const viewportHeight = parseFloat(ctx.viewport.height)

    const dragDimensions = { x: Math.abs(dragBox.x1 - dragBox.x2), y: Math.abs(dragBox.y1 - dragBox.y2) }
    const dragScales = { x: viewportWidth * (dragDimensions.x / canvasWidth), y: viewportHeight * (dragDimensions.y / canvasHeight) }
    
    setViewportWidth(dragScales.x)
    setViewportHeight(dragScales.y)
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
