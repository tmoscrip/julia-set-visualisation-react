import React, { useContext } from 'react'
import { ShaderContext } from './ModelProvider'

export default function PauseButton() {
  const ctx = useContext(ShaderContext)

  const [paused, setPaused] = ctx.time.paused
  const [lastPausedAt, setLastPausedAt] = ctx.time.lastPausedAt
  const setPauseDuration = ctx.time.pauseDuration[1]

  function pause() {
    setPaused(true)
    setLastPausedAt(Date.now())
  }

  function resume() {
    setPaused(false)
    setPauseDuration(pauseDuration => pauseDuration + (Date.now() - lastPausedAt))
  }

  function togglePause() {
    if (paused === true) {
      resume()
    } else if (paused === false) {
      pause()
    }
  }

  return (
    <button onClick={togglePause} className='pause-button'>
      {paused ? 'Resume' : 'Pause'}
    </button>
  )
}
