import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import Folder from '../base_components/Folder'
import ColorPointItem from './ColorPointItem'

export default function ColorMapFolder() {
  const ctx = useContext(ShaderContext)
  const [colorPoints, setColorPoints] = ctx.color.colorPoints

  // Processes updates to child colour and position elements
  function handleColorPointChanges(e, idx) {
    const newValue = e.target.value
    const objAtIdx = colorPoints[idx]

    const nextObj = (() => {
      switch (e.target.name) {
        case 'color':
          return { ...objAtIdx, hex: newValue }
        case 'position':
          return { ...objAtIdx, position: newValue }
        default:
          return objAtIdx
      }
    }).call()

    // When updating an array stored in state, a new array must be created for a change to be detected
    // Otherwise, effects dependant on the state will not trigger on update
    // See: https://stackoverflow.com/questions/54620928/useeffect-hook-not-firing-after-state-change/54621059#54621059
    const nextColorPoints = [...colorPoints]
    nextColorPoints[idx] = nextObj
    setColorPoints(nextColorPoints)
  }

  return (
    <Folder title='Colour Points'>
      {colorPoints.map((item, idx) => (
        <ColorPointItem item={item} key={idx} idx={idx} handleChange={handleColorPointChanges} />
      ))}
    </Folder>
  )
}
