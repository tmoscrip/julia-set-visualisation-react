import React from 'react'
import MaxIterations from './MaxIterations'
import Viewport from './Viewport'
import ComplexPoly from './ComplexPoly'

function ControlPanel() {
  const style = {
    margin: '0 auto',
    display: 'block',
    width: '32rem'
  }

  return (
    <div style={style}>
      <MaxIterations />
      <Viewport />
      <ComplexPoly />
    </div>
  )
}

export default ControlPanel
