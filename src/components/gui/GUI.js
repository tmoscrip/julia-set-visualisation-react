import React, { useRef, useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { useWindowSize } from './../Hooks'

function useScrollbarSizing(elemRef, windowHeight) {
  const [bool, setBool] = useState(false)
  // If ref element has not been initialised, don't display a scroll
  const elemHeight = elemRef.current ? elemRef.current.getBoundingClientRect().height : 0

  useEffect(() => {
    if (elemHeight >= windowHeight) {
      setBool(true)
    } else {
      setBool(false)
    }
  }, [elemHeight, windowHeight])

  return bool
}

export default function GUI({ children }) {
  const ref = useRef()
  const { height } = useWindowSize()
  const shouldHaveScroll = useScrollbarSizing(ref, height)

  const className = `gui-container ${shouldHaveScroll ? 'scrollable' : ''}`

  return (
    <ul ref={ref} style={{ height }} className={className}>
      {children}
    </ul>
  )
}

GUI.propTypes = {
  children: PropTypes.node.isRequired,
}
