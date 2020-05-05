import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from '../base_components/InputField'

export function ConstantPointX() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.c.x

  const label = 'X'
  const id = 'constantx'
  const tooltip = `X (real) component of the constant point C. Keep values between -2 and 2 for most interesting results`

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}

export function ConstantPointY() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.c.y

  const label = 'Y'
  const id = 'constanty'
  const tooltip = `Y (imaginary) component of the constant point C. Keep values between -2 and 2 for most interesting results`

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
