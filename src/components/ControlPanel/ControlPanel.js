import React from 'react'
import MaxIterations from './MaxIterations'
import Viewport from './Viewport'
import ComplexPoly from './ComplexPoly'
import CollapsiblePanel from '../CollapsiblePanel'
import PauseButton from '../PauseButton'
import CValue from './CValue'
import PresetSaver from '../PresetSaver'
import ColorMap from './ColorMap'

function Spacer({ size }) {
  return <div style={{ marginBottom: size }} />
}

function ControlPanel({ children }) {
  // TODO: Convert integer field values to glsl floats

  return (
    <CollapsiblePanel styleClass='control-panel'>
      <PresetSaver />
      <Spacer size='3em' />
      <MaxIterations />
      <Spacer size='3em' />
      <Viewport />
      <Spacer size='3em' />
      <CValue />
      <ComplexPoly />
      <Spacer size='3em' />
      <ColorMap />
      <Spacer size='3em' />
      <PauseButton />
      {children}
    </CollapsiblePanel>
  )
}

export default ControlPanel
