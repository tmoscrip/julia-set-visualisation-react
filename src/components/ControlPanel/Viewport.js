import React, { useContext } from 'react'
import { ShaderContext } from '../ModelProvider'
import { LabelledField, CheckboxField } from './InputTypes'
import CollapsibleGroup from './CollapsibleGroup'

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

function TranslateX() {
  const ctx = useContext(ShaderContext)
  const [translateX, setTranslateX] = ctx.viewport.translate.x

  const helpText = 'Translate x'

  return <LabelledField label='Translate X' helpText={helpText} inputValue={translateX} setInputValue={setTranslateX} />
}

function TranslateY() {
  const ctx = useContext(ShaderContext)
  const [translateY, setTranslateY] = ctx.viewport.translate.y

  const helpText = 'Translate y'

  return <LabelledField label='Translate Y' helpText={helpText} inputValue={translateY} setInputValue={setTranslateY} />
}

function AspectRatioLock() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.lockAspectRatio

  const label = 'Lock aspect ratio'
  const helpText = 'Toggle viewport aspect ratio locking'

  return <CheckboxField label={label} helpText={helpText} inputValue={value} setInputValue={setValue} />
}

export default function Viewport() {
  const title = 'Viewport'

  return (
    <CollapsibleGroup title={title}>
      <Width />
      <Height />
      <TranslateX />
      <TranslateY />
      <AspectRatioLock />
    </CollapsibleGroup>
  )
}
