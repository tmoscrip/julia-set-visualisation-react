import React from 'react'

export default function HelpTooltip({hoverText}) {
  return (
    <div className='tooltip'>
      <span className='tooltip-text'>{hoverText}</span>
    </div>
  )
}
