import React from 'react'
import MaxIterations from './MaxIterations'
import Viewport from './Viewport'
import ComplexPoly from './ComplexPoly'
import CollapsiblePanel from '../CollapsiblePanel'
import PauseButton from '../PauseButton'
import CValue from './CValue'
import PresetSaver from '../PresetSaver'
import ColorMap from './ColorMap'
import JuliaSmoothing from './JuliaSmoothing'

function ControlPanel({ children }) {
  function Spacer({ size }) {
    return <div style={{ marginBottom: size }} />
  }
  // TODO: Convert integer field values to glsl floats

  return (
    <CollapsiblePanel styleClass='control-panel'>
      <PresetSaver />
      <Spacer size='3em' />
      <p className='field-container'>Drag a box on the canvas to zoom to that area</p>
      <p className='field-container'>Integers must be followed by a period to avoid compiliation errors</p>
      <Spacer size='3em' />
      <MaxIterations />
      <JuliaSmoothing />
      <Spacer size='3em' />
      <Viewport />
      <Spacer size='3em' />
      <CValue />
      {/* <ComplexPoly />
      <Spacer size='3em' />
      <ColorMap /> */}
      <Spacer size='3em' />
      <PauseButton />
      {children}
    </CollapsiblePanel>
  )
}

export default ControlPanel
