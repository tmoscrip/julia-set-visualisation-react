import { PropTypes } from 'prop-types'
import React from 'react'
import { useToggle } from '../../Hooks'

export default function Folder({ title, children, startClosed }) {
  startClosed = startClosed ? true : false
  const [closed, toggle] = useToggle(startClosed)

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
  startClosed: PropTypes.bool,
  children: PropTypes.node,
}
