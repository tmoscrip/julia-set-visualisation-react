import React, { useContext } from 'react'
import Button from './../base_components/Button'
import Item from '../base_components/Item'
import { ShaderContext } from './../../ModelProvider'

export default function PauseButton() {
  const ctx = useContext(ShaderContext)
  const [paused, setPaused] = ctx.time.paused
  const text = paused ? 'Resume' : 'Pause'
  const className = 'btn-full'

  function toggle() {
    if (paused) {
      setPaused(false)
    } else {
      setPaused(true)
    }
  }

  return (
    <Item>
      <Button text={text} onClick={toggle} className={className} />
    </Item>
  )
}
