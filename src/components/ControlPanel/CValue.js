import React, { useContext } from 'react'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'

function CValueX() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.c.x

  const helpText = 'C value x'

  return <LabelledField label='C Y' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}

function CValueY() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.c.y

  const helpText = 'C value y'

  return <LabelledField label='C X' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}

export default function CValue() {
  return (
    <>
      <CValueX />
      <CValueY />
    </>
  )
}
