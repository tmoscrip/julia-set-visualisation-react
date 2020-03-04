import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import LabelledField from './LabelledField'

export default function MaxIterations() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.maxIterations

  return <LabelledField label='Max Iterations' inputValue={inputValue} setInputValue={setInputValue} />
}
