import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from '../base_components/InputField'
import { lowerTrim } from './../../../helpers'

export default function MaxIterations() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.maxIterations

  const label = 'Max Iterations'
  const id = lowerTrim(label)
  const tooltip = 'Maximum number of times to iterate a point before it is considered to be part of the bounded set'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField id={id} label={label} tooltip={tooltip} value={value} onChange={onChange} />
}
