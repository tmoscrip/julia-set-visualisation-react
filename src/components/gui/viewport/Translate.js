import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import { lowerTrim } from './../../../helpers'
import InputField from './../base_components/InputField'

export function TranslateX() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.translate.x

  const label = 'Translate X'
  const id = lowerTrim(label)
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

  const label = 'Translate Y'
  const id = lowerTrim(label)
  const tooltip = 'Vertical translation of the complex plane'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
