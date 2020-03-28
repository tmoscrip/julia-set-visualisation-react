import React, { useState } from 'react'
import { DoubleArrow } from './../Icons'

function GroupToggleButton({ open, setOpen }) {
  function toggle() {
    if (open === true) {
      setOpen(false)
    } else if (open === false) {
      setOpen(true)
    }
  }

  return <DoubleArrow onClick={toggle} facing={open ? 'up' : 'down'} className='group-button' />
}

export default function CollapsibleGroup({ title, children }) {
  const [open, setOpen] = useState(true)

  const contentClasses = 'group-content '.concat(open ? 'open' : '')
  const containerClasses = 'group-container '.concat(open ? 'open' : '')

  return (
    <div className={containerClasses}>
      <div className='group-heading'>
        <span className='group-title'>{title}</span>
        <GroupToggleButton open={open} setOpen={setOpen} />
      </div>
      <div className={contentClasses}> {children}</div>
    </div>
  )
}
