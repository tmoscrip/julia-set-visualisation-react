import React from 'react'
import Viewport from './Viewport'
import CollapsiblePanel from './CollapsiblePanel'
import PauseButton from './PauseButton'
import PresetSaver from './PresetSaver'
import JuliaVariables from './Julia'
import ColorMap from './ColorMap'

function ControlPanel({ children }) {
  function Spacer({ size }) {
    return <div style={{ marginBottom: size }} />
  }
  // TODO: Convert integer field values to glsl floats

  return (
    <CollapsiblePanel styleClass='control-panel'>
      <PauseButton />
      <Spacer size='3em' />
      <p className='field-container'>Drag a box on the canvas to zoom to that area</p>
      <Spacer size='3em' />
      <JuliaVariables />
      <Spacer size='3em' />
      <Viewport />
      <Spacer size='3em' />
      <ColorMap />
      <Spacer size='3em' />
      <PresetSaver />
      <Spacer size='3em' />
      {children}
    </CollapsiblePanel>
  )
}

export default ControlPanel
