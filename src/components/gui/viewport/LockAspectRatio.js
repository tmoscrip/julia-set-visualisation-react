import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from './../base_components/InputField'
import { lowerTrim } from './../../../helpers'

export default function LockAspectRatio() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.viewport.lockAspectRatio

  const label = 'Lock aspect ratio'
  const id = lowerTrim(label)
  const tooltip = 'Lock the aspect ratio of the complex plane to match that of the canvas'

  function onChange(e) {
    const newValue = e.target.checked
    setValue(newValue)
  }

  return <InputField type='checkbox' id={id} label={label} tooltip={tooltip} value={value} onChange={onChange} />
}
