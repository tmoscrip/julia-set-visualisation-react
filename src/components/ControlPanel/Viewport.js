import React, { useContext } from 'react'
import Translate from './Translate'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'

export default function Viewport() {
  function Width() {
    const ctx = useContext(ShaderContext)
    const [width, setWidth] = ctx.viewport.width
  
    return <LabelledField label='Viewport Width' inputValue={width} setInputValue={setWidth} />
  }
  
  function Height() {
    const ctx = useContext(ShaderContext)
    const [height, setHeight] = ctx.viewport.height
  
    return <LabelledField label='Viewport Height' inputValue={height} setInputValue={setHeight} />
  }
  
  return (
    <div>
      <Width />
      <Height />
      <Translate />
    </div>
  )
}
