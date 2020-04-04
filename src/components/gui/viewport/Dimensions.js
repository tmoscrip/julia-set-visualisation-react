import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import { lowerTrim } from './../../../helpers'
import InputField from './../base_components/InputField'

export function ViewportWidth() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.width

  const label = 'Viewport width'
  const id = lowerTrim(label)
  const tooltip = 'Width of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}

export function ViewportHeight() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.height

  const label = 'Viewport height'
  const id = lowerTrim(label)
  const tooltip = 'Height of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
