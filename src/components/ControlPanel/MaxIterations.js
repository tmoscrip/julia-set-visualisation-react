import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import LabelledField from './LabelledField'

export default function MaxIterations() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.maxIterations

  const helpText = 'Max iterations'

  return <LabelledField label='Max Iterations' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}
