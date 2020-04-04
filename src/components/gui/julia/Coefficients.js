import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from '../base_components/InputField'
import { lowerTrim } from './../../../helpers'

export default function Coefficients() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.coefficients

  const label = 'Coefficients'
  const id = lowerTrim(label)
  const tooltip = `Comma-seperated values for the coefficients of each polynomial term. \n
    N values applied in the order Z<sup>n-1</sup> + Z<sup>n-2</sup> + ... + Z, C`

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
