import React from 'react'
import { ShaderContext } from '../ModelProvider'
import { useContext } from 'react'
import HelpTooltip from './HelpTooltip'

export default function AspectRatioLock() {
  const ctx = useContext(ShaderContext)
  const [lockAspectRatio, setLockAspectRatio] = ctx.viewport.lockAspectRatio

  const label = 'Lock aspect ratio'
  const helpText = 'Toggle aspect ratio lock'

  function toggle() {
    if (lockAspectRatio === false) {
      setLockAspectRatio(true)
    } else {
      setLockAspectRatio(false)
    }
  }

  return (
    <div className='field-container'>
      <span className='panel-label'>{label}</span>
      {helpText ? <HelpTooltip hoverText={helpText} /> : null}
      <input className='panel-input' type='checkbox' name={label} checked={lockAspectRatio} onChange={toggle} />
    </div>
  )
}
