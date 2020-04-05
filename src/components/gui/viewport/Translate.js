import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import { lowerTrim } from './../../../helpers'
import InputField from './../base_components/InputField'

export function TranslateX() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.translate.x

  const label = 'X'
  const id = 'translatex'
  const tooltip = 'Horizontal translation of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}

export function TranslateY() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.translate.y

  const label = 'Y'
  const id = 'translatey'
  const tooltip = 'Vertical translation of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
