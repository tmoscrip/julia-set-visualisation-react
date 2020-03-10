import React from 'react'
import MaxIterations from './MaxIterations'
import Viewport from './Viewport'
import ComplexPoly from './ComplexPoly'
import CollapsiblePanel from '../CollapsiblePanel'
import PauseButton from '../PauseButton'
import CValue from './CValue'

function ControlPanel({ children }) {
  // TODO: Convert integer field values to glsl floats

  return (
    <CollapsiblePanel styleClass='control-panel'>
      <PauseButton />
      <MaxIterations />
      <Viewport />
      <CValue />
      <ComplexPoly />
      {children}
    </CollapsiblePanel>
  )
}

export default ControlPanel
