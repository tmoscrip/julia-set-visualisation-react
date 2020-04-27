import React from 'react'
import PropTypes from 'prop-types'

export default function Item({ children, className }) {
  className = className || ''
  return <li className={`item ${className}`}>{children}</li>
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
