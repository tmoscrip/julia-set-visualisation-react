import React from 'react'
import PropTypes from 'prop-types'
import HelpTooltip from './HelpTooltip'

export default function Label({ htmlFor, text, tooltip }) {
  tooltip = tooltip || null
  return (
    <>
      <label htmlFor={htmlFor}>
        {text} {tooltip ? <HelpTooltip text={tooltip} /> : null}
      </label>
    </>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
