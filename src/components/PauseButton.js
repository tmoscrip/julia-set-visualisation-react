import React, { useContext, useState } from 'react'
import { ShaderContext } from './ModelProvider'

export default function PauseButton() {
  const ctx = useContext(ShaderContext)
  const [text, setText] = useState('pause')

  const style = {
    margin: '0 auto',
    display: 'block',
    height: '4rem',
    width: '8rem'
  }

  function pause() {
    ctx.time.paused = true
    setText('resume')
    ctx.time.lastPausedAt = Date.now()
  }

  function resume() {
    ctx.time.paused = false
    setText('pause')
    ctx.time.pauseDuration += (Date.now() - ctx.time.lastPausedAt)
  }

  function handleClick(event) {
    if (ctx.time.paused === true) {
      resume()
    } else if (ctx.time.paused === false) {
      pause()
    }
  }

  return <button onClick={handleClick} style={style}>{text}</button>
}
