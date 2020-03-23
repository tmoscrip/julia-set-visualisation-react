import React, { useContext } from 'react'
import Translate from './Translate'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'
import CheckboxField from './CheckboxField'

function Width() {
  const ctx = useContext(ShaderContext)
  const [width, setWidth] = ctx.viewport.width

  const helpText = 'Viewport width'

  return <LabelledField label='Viewport Width' helpText={helpText} inputValue={width} setInputValue={setWidth} />
}

function Height() {
  const ctx = useContext(ShaderContext)
  const [height, setHeight] = ctx.viewport.height

  const helpText = 'Viewport height'

  return <LabelledField label='Viewport Height' helpText={helpText} inputValue={height} setInputValue={setHeight} />
}

function AspectRatioLock() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.lockAspectRatio

  const label = 'Lock aspect ratio'
  const helpText = 'Toggle viewport aspect ratio locking'

  return <CheckboxField label={label} helpText={helpText} inputValue={value} setInputValue={setValue} />
}

export default function Viewport() {
  return (
    <>
      <Width />
      <Height />
      <Translate />
      <AspectRatioLock />
    </>
  )
}
