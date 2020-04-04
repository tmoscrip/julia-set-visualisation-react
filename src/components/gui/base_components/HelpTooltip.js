import React, { useRef, useEffect } from 'react'
import { PropTypes } from 'prop-types'

export default function HelpTooltip({ text }) {
  return (
    <div className='tooltip'>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

HelpTooltip.propTypes = {
  text: PropTypes.node.isRequired,
}
