import React, { useRef, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { glTest } from '../webgl'
import { ShaderContext } from './ModelProvider'
import DebugFrame from './DebugFrame'

export default function ShaderCanvas({ width, height }) {
  const canvasRef = useRef()
  const requestRef = useRef()
  const ctx = useContext(ShaderContext)
  const [frameCount, setFrameCount] = useState(0)
  const [lastFrameTime, setLastFrameTime] = useState(0)

  const animate = () => {
    if (ctx.time.paused === false) {
      setLastFrameTime(Date.now())
      glTest(ctx)
      setFrameCount(frameCount => frameCount + 1)
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  // Initialise canvas and webgl
  useEffect(() => {
    ctx.canvas = canvasRef.current
    ctx.gl = canvasRef.current.getContext('webgl')
  }, [])

  // Start rendering
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <div>
      <canvas className='glcanvas' ref={canvasRef} width={width} height={height} />
      <DebugFrame frameCount={frameCount} frameTime={Date.now() - lastFrameTime} />
    </div>
  )
}

ShaderCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
