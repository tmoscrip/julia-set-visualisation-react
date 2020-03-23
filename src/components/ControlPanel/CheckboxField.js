import React from 'react'
import HelpTooltip from './HelpTooltip'

export default function AspectRatioLock({ label, helpText, inputValue, setInputValue }) {
  function toggle() {
    if (inputValue === false) {
      setInputValue(true)
    } else {
      setInputValue(false)
    }
  }

  return (
    <div className='field-container'>
      <span className='panel-label'>{label}</span>
      {helpText ? <HelpTooltip hoverText={helpText} /> : null}
      <input className='panel-input' type='checkbox' name={label} checked={inputValue} onChange={toggle} />
    </div>
  )
}
