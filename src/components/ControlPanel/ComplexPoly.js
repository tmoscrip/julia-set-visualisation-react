import React, { useContext } from 'react'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'

export default function ComplexPoly() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.complexPoly

  const helpText = 'Complex poly quadratic'

  return <LabelledField label='CPQ' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}
