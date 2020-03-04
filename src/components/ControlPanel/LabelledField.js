import React from 'react'

export default function LabelledField({ label, inputValue, setInputValue }) {
  function handleChange(event) {
    setInputValue(event.target.value)
    inputValue = event.target.value
  }

  return (
    <div>
      <span>{label}</span>
      <input name={label} value={inputValue} onChange={handleChange} />
    </div>
  )
}
