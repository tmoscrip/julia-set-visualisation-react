import React, { useState } from 'react'

function GroupToggleButton({ open, setOpen }) {
  function toggle() {
    if (open === true) {
      setOpen(false)
    } else if (open === false) {
      setOpen(true)
    }
  }

  return (
    <button onClick={toggle} className='group-toggle'>
      {open ? 'Close' : 'Open'}
    </button>
  )
}

export default function CollapsibleGroup({ title, children }) {
  const [open, setOpen] = useState(true)

  const contentClasses = 'group-content '.concat(open ? 'open' : '')

  return (
    <div className='group-container'>
      <div className='group-heading'>
        <span className='group-title'>{title}</span>
        <GroupToggleButton open={open} setOpen={setOpen} />
      </div>
      <div className={contentClasses}> {children}</div>
    </div>
  )
}
