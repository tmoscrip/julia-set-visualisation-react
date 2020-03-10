import React, { useState } from 'react'

function PanelToggleButton({open, setOpen}) {


  function togglePanel(event) {
    if (open === true) {
      setOpen(false)
    } else if (open === false) {
      setOpen(true)
    }
  }

  return(
    <button onClick={togglePanel} className='panel-toggle'>{open ? '<<<' : '>>>'}</button>
  )
}

export default function CollapsiblePanel({children, styleClass}) {
  const [open, setOpen] = useState(true)


  return (
    <div className={`${styleClass} panel ${open ? 'panel-open' : 'panel-closed'}`} >
      <PanelToggleButton open={open} setOpen={setOpen}/>
      {children}
    </div>
  )
}
