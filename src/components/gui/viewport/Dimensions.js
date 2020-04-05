import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import { lowerTrim } from './../../../helpers'
import InputField from './../base_components/InputField'

export function ViewportWidth() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.width

  const label = 'Width'
  const id = 'viewportwidth'
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

  const label = 'Height'
  const id = 'viewportheight'
  const tooltip = 'Height of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
