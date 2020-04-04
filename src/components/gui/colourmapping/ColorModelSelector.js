import React from 'react'
import OptionSelector from '../base_components/OptionSelector'
import { useContext } from 'react'
import { ShaderContext } from '../../ModelProvider'
import { ColorSpaces } from '../../../colorspace'
import { lowerTrim } from './../../../helpers';

export default function ColorModelSelector() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.color.colorModel
  const options = ColorSpaces.map(obj => obj.name)

  const label = 'Colour model'
  const id = lowerTrim(label)
  const tooltip = 'Colour model used for interpolation between each colour specified in the colour map'

  function onChange(e) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return <OptionSelector label={label} id={id} tooltip={tooltip} options={options} value={value} onChange={onChange} />
}
