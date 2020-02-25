import React from 'react'

export default function DebugFrame({frameCount, frameTime}) {
  const divStyle = {
    display: 'block',
    margin: 'auto',
    marginTop: '0.5rem'
  }

  const textStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '0.5rem'
  }
  return (
    <div style={divStyle}>
      <p style={textStyle}>frames: {frameCount}</p>
      <p style={textStyle}>frametime: {frameTime}ms</p>
    </div>
  )
}
