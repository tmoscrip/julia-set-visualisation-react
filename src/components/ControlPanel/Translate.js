import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider';
import LabelledField from './LabelledField';

function TranslateX() {
  const ctx = useContext(ShaderContext)
  const [translateX, setTranslateX] = ctx.viewport.translate.x

  return(
    <LabelledField label='Translate X' inputValue={translateX} setInputValue={setTranslateX} />
  )
}

function TranslateY() {
  const ctx = useContext(ShaderContext)
  const [translateY, setTranslateY] = ctx.viewport.translate.y

  return(
    <LabelledField label='Translate Y' inputValue={translateY} setInputValue={setTranslateY} />
  )
}

export default function Translate() {
  return (
    <div>
      <TranslateX />
      <TranslateY />
    </div>
  )
}
