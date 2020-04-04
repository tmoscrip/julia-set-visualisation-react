import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from '../base_components/InputField'
import { lowerTrim } from './../../../helpers'

export function ConstantPointX() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.c.x

  const label = 'Constant X'
  const id = lowerTrim(label)
  const tooltip = `X (real) component of the constant point of the Julia Set function`

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}

export function ConstantPointY() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.c.y

  const label = 'Constant Y'
  const id = lowerTrim(label)
  const tooltip = `Y (imaginary) component of the constant point of the Julia Set function`

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
