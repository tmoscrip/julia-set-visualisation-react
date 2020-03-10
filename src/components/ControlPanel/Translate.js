import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import LabelledField from './LabelledField'

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

export default function Translate() {
  return (
    <>
      <TranslateX />
      <TranslateY />
    </>
  )
}
