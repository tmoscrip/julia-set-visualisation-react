import { PropTypes } from 'prop-types'
import React from 'react'
import { useToggle } from '../../Hooks'

export default function Folder({ title, children }) {
  const [closed, toggle] = useToggle(false)

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
