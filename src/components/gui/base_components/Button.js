import React from 'react'
import { PropTypes } from 'prop-types'

export default function Button({ text, onClick, className }) {
  text = text || null
  
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}
