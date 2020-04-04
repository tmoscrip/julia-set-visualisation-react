import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import { lowerTrim } from './../../../helpers'
import InputField from './../base_components/InputField'

export default function TimeScale() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.time.timeScale

  const label = 'Time Scale'
  const id = lowerTrim(label)
  const tooltip = 'Scale the speed at which time passes for functions reliant on u_time'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <InputField id={id} label={label} tooltip={tooltip} value={value} onChange={onChange} />
}
