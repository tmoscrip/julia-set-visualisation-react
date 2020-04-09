import React, { useRef, useEffect, useContext, useState } from 'react'
import { glDrawFrame } from '../webgl'
import { ShaderContext, contextToValueObject } from './ModelProvider'
import { parseHexColor } from '../texture'
import { generateTextureData } from './../texture'
import { useWindowSize } from './Hooks'

export function scaleViewportByAspectRatio({ width, height, anchor }) {
  function getOrientation() {
    const canvas = document.getElementsByClassName('glcanvas')[0]
    const [canvasWidth, canvasHeight] = [canvas.offsetWidth, canvas.offsetHeight]
    return canvasWidth > canvasHeight ? 'landscape' : 'portrait'
  }

  function getAspectRatio(orientation) {
    const canvas = document.getElementsByClassName('glcanvas')[0]
    const [canvasWidth, canvasHeight] = [canvas.offsetWidth, canvas.offsetHeight]
    // return early if 0 to avoid div by 0 errors
    if (canvasHeight === 0 || canvasWidth === 0) return 1
    if (orientation === 'landscape') {
      return canvasHeight / canvasWidth
    } else if (orientation === 'portrait') {
      return canvasWidth / canvasHeight
    }
    // Fallback if orientation does not match one of two expected values
    return 1
  }

  anchor = anchor || getOrientation()
  const aspectRatio = getAspectRatio(anchor)
  // For landscape, width should not change
  // For portrait, height should not change
  if (anchor === 'landscape') {
    height = width * aspectRatio
  } else if (anchor === 'portrait') {
    width = height * aspectRatio
  }
  return { width, height }
}

function useGlCanvas() {
  const ctx = useContext(ShaderContext)

  const canvasRef = useRef()
  const setRef = ctx.canvasRef[1]
  const setGl = ctx.gl[1]

  useEffect(() => {
    setRef(canvasRef.current)
    setGl(canvasRef.current.getContext('webgl'))
  }, [setRef, setGl, canvasRef])

  return canvasRef
}

function useJuliaAnimation() {
  const ctx = useContext(ShaderContext)
  const animateRef = useRef()
  const [lastFrameTime, setLastFrameTime] = ctx.time.lastFrameTime
  const [elapsed, setElapsed] = ctx.time.elapsed
  const [timeScale] = ctx.time.timeScale
  const [paused] = ctx.time.paused
  const [gl] = ctx.gl

  // Define function to be run on every frame render
  const animate = () => {
    // Do nothing if gl not available
    if (gl === null) {
      return
    }

    // Advance time if not paused
    if (!paused) {
      const timeElapsedThisFrame = Date.now() - lastFrameTime
      const elapsedDelta = parseFloat(timeElapsedThisFrame * timeScale)
      if (parseFloat(elapsedDelta)) {
        setElapsed(elapsed + elapsedDelta)
      }
    }

    // Draw frames even when 'paused'
    // Pausing only stops time advancing, we want to see the results
    // of manipulations even while 'paused'
    const glObj = contextToValueObject(ctx)
    glDrawFrame(glObj)
    setLastFrameTime(Date.now())
  }

  useEffect(() => {
    // Start frame requests
    animateRef.current = requestAnimationFrame(animate)
    // Return cleanup as callback
    return () => cancelAnimationFrame(animateRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx])
}

function useScaleInitialRenderViewport() {
  const ctx = useContext(ShaderContext)
  const [width, setWidth] = ctx.viewport.width
  const [height, setHeight] = ctx.viewport.height

  useEffect(() => {
    const newViewport = scaleViewportByAspectRatio({ width, height })
    setWidth(newViewport.width)
    setHeight(newViewport.height)
    // Effect can't fire when width/height changes, results in loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function useTextureBuilder() {
  const ctx = useContext(ShaderContext)
  const [colorPoints] = ctx.color.colorPoints
  const [curve] = ctx.color.curve
  const [colorModel] = ctx.color.colorModel
  const [, setTextureData] = ctx.color.textureData

  useEffect(() => {
    const cp = colorPoints.map((o) => {
      return {
        color: parseHexColor(o.hex),
        position: o.position,
      }
    })
    const newTextureData = generateTextureData(cp, curve, colorModel)
    setTextureData(newTextureData)
  }, [colorPoints, curve, colorModel, setTextureData])
}

export default function ShaderCanvas() {
  const ctx = useContext(ShaderContext)
  const windowSize = useWindowSize()

  const [lockAspectRatio] = ctx.viewport.lockAspectRatio
  const [dragStart, setDragStart] = useState()

  // Initialise canvas and webgl
  const canvasRef = useGlCanvas()

  // Build colour mapping texture
  useTextureBuilder()

  // Scale initial viewport size to respect aspect ratio
  useScaleInitialRenderViewport()

  // Start rendering
  useJuliaAnimation()

  function startDrag(e) {
    const loc = [e.clientX, e.clientY]
    setDragStart(loc)
  }

  function endDrag(e) {
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

    function dragHasNoArea({ x1, x2, y1, y2 }) {
      const width = Math.abs(x1 - x2)
      const height = Math.abs(y1 - y2)

      return width < 1 || height < 1
    }

    const setTranslateX = ctx.viewport.translate.x[1]
    const setTranslateY = ctx.viewport.translate.y[1]
    const setViewportWidth = ctx.viewport.width[1]
    const setViewportHeight = ctx.viewport.height[1]

    const dragEnd = [e.clientX, e.clientY]
    const canvas = document.getElementsByClassName('glcanvas')[0]
    const [canvasWidth, canvasHeight] = [canvas.offsetWidth, canvas.offsetHeight]

    // Handle error where drags ended on an element other than the canvas
    if (dragStart === undefined || dragEnd === undefined) {
      return
    }

    // y values subtracted from canvas height to get correct locations
    // canvas dimensions are measured from top left, need to start from bottom left
    // as that's what our grid starts from
    const dragBox = {
      x1: dragStart[0],
      x2: dragEnd[0],
      y1: canvas.offsetHeight - dragStart[1],
      y2: canvas.offsetHeight - dragEnd[1],
    }

    // Prevent clicks on one point zooming into an infinitely small area
    if (dragHasNoArea(dragBox)) {
      return
    }

    const dragCenterCanvas = { x: (dragBox.x1 + dragBox.x2) / 2, y: (dragBox.y1 + dragBox.y2) / 2 }
    const dragCenterGrid = canvasToGrid(dragCenterCanvas)

    setTranslateX(dragCenterGrid.x)
    setTranslateY(dragCenterGrid.y)

    // Scale current viewport size by ratio of drag box
    const viewportWidth = parseFloat(ctx.viewport.width)
    const viewportHeight = parseFloat(ctx.viewport.height)

    const dragDimensions = { width: Math.abs(dragBox.x1 - dragBox.x2), height: Math.abs(dragBox.y1 - dragBox.y2) }
    const dragViewport = {
      width: viewportWidth * (dragDimensions.width / canvasWidth),
      height: viewportHeight * (dragDimensions.height / canvasHeight),
    }

    if (lockAspectRatio === true) {
      const newViewport = scaleViewportByAspectRatio(dragViewport)
      setViewportWidth(newViewport.width)
      setViewportHeight(newViewport.height)
    } else {
      setViewportWidth(dragViewport.width)
      setViewportHeight(dragViewport.height)
    }
  }

  return (
    <>
      <canvas
        className='glcanvas'
        width={windowSize.width}
        height={windowSize.height}
        onMouseDown={startDrag}
        onMouseUp={endDrag}
        ref={canvasRef}
      />
    </>
  )
}
