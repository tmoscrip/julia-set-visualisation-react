import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

export default function Folder({ title, children }) {
  const [closed, setClosed] = useState(false)

  function toggle(e) {
    if (closed) {
      setClosed(false)
    } else {
      setClosed(true)
    }
  }

  return (
    <li className='folder'>
      <div className='group'>
        <ul className={closed ? 'closed' : ''}>
          <li className='title' onClick={toggle}>
            {title}
          </li>
          {children}
        </ul>
      </div>
    </li>
  )
}

Folder.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
