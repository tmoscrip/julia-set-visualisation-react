import React, { useContext } from 'react'
import MaxIterations from './MaxIterations'
import { ShaderContext } from '../ModelProvider';

function ControlPanel(props) {
  const ctx= useContext(ShaderContext)

  return (
    <div>
      <MaxIterations label='max iterations'/>
    </div>
  )
}

export default ControlPanel
