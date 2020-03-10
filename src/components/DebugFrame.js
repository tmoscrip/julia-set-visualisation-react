import React from 'react'

export default function DebugFrame({frameCount, frameTime}) {

  return (
    <div className='frametime'>
      <p>Frames: {frameCount}</p>
      <p>Frametime: {frameTime}ms</p>
    </div>
  )
}
