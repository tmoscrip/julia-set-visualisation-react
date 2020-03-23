import React, { useContext } from 'react'
import CheckboxField from './CheckboxField'
import { ShaderContext } from './../ModelProvider';

export default function JuliaSmoothing() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.useSmoothing

  const label = 'Julia smoothing'
  const helpText = 'Toggle Julia iteration smoothing'

  return <CheckboxField label={label} helpText={helpText} inputValue={value} setInputValue={setValue} />
}
