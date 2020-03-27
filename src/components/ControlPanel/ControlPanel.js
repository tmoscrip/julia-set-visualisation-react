import React from 'react'
import MaxIterations from './MaxIterations'
import Viewport from './Viewport'
import Polynomial from './Polynomial'
import CollapsiblePanel from '../CollapsiblePanel'
import PauseButton from '../PauseButton'
import CValue from './CValue'
import PresetSaver from '../PresetSaver'
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
      <Spacer size='3em' />
      <MaxIterations />
      <JuliaSmoothing />
      <Spacer size='3em' />
      <p className='field-container'>
        Any integers in the following fields <b>must</b> be followed by a period to avoid compiliation errors
      </p>
      <Spacer size='3em' />
      <Viewport />
      <Spacer size='3em' />
      <CValue />
      <Polynomial />
      <Spacer size='3em' />
      <PauseButton />
      {children}
    </CollapsiblePanel>
  )
}

export default ControlPanel
