import React from 'react'
import HelpTooltip from './HelpTooltip'

export function CheckboxField({ label, helpText, inputValue, setInputValue }) {
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

export function LabelledField({ label, helpText, inputValue, setInputValue }) {
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
