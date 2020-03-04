import React from 'react'
import PropTypes from 'prop-types'
import ShaderCanvas from './ShaderCanvas'
import PauseButton from './PauseButton'
import ControlPanel from './ControlPanel/ControlPanel'

function AppCanvas({ width, height }) {
  return (
    <div>
      <ShaderCanvas width={width} height={height} />
      <PauseButton />
      <ControlPanel />
    </div>
  )
}

AppCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

AppCanvas.defaultProps = {
  width: 800,
  height: 800,
}

export default AppCanvas
