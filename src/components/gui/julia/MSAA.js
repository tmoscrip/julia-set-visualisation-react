import React, { useContext } from 'react'
import OptionSelector from './../base_components/OptionSelector'
import { ShaderContext } from './../../ModelProvider'

export const msaaOptions = [
  { name: '1x', value: 1 },
  { name: '2x', value: 2 },
  { name: '4x', value: 4 },
  { name: '8x', value: 8 },
  { name: '16x', value: 16 },
]

export default function MSAA() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.msaa

  const options = msaaOptions.map(item => item.name)

  const label = 'Anti-aliasing'
  const id = 'msaa'
  const tooltip =
    'Level of multisample anti-aliasing applied to render. High levels may result in considerable slowdown'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <OptionSelector label={label} id={id} tooltip={tooltip} options={options} value={value} onChange={onChange} />
}
