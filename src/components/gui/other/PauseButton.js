import React, { useContext } from 'react'
import Button from './../base_components/Button'
import Item from './../base_components/Item'
import { useStatefulToggle } from './../../Hooks'
import { ShaderContext } from './../../ModelProvider'

export default function PauseButton() {
  const [paused, togglePause] = useStatefulToggle(['time', 'paused'])
  const text = paused ? 'Resume' : 'Pause'

  // const ctx = useContext(ShaderContext)
  // const [paused, setPaused] = ctx.time.paused

  // function togglePause() {
  //   if (paused) {
  //     setPaused(false)
  //   } else {
  //     setPaused(true)
  //   }
  // }

  return (
    <Item>
      <Button text={text} onClick={togglePause} />
    </Item>
  )
}
