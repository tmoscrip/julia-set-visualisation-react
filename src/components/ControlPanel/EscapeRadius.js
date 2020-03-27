import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import LabelledField from './LabelledField'

export default function MaxIterations() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.escapeRadius

  const helpText = 'Escape radius'

  return <LabelledField label='Escape radius' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}
