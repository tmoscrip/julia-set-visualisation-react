import React from 'react'
import HelpTooltip from './HelpTooltip'

export default function LabelledField({ label, helpText, inputValue, setInputValue }) {
  function handleChange(event) {
    setInputValue(event.target.value)
    inputValue = event.target.value
  }

  return (
    <div className='field-container'>
      <span className='panel-label'>{label}</span>
      {helpText ? <HelpTooltip hoverText={helpText} /> : null}
      <input className='panel-input' name={label} value={inputValue} onChange={handleChange} />
    </div>
  )
}
