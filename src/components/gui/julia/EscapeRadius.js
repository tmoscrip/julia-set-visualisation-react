import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from '../base_components/InputField'
import { lowerTrim } from './../../../helpers';

export default function EscapeRadius() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.escapeRadius

  const label = 'Escape Radius'
  const id = lowerTrim(label)
  const tooltip =
    "When an iterates' magnitude is greater than the square root of this number, consider it as tending towards infinity"

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
