import React from 'react'
import OptionSelector from '../base_components/OptionSelector'
import { useContext } from 'react'
import { ShaderContext } from '../../ModelProvider'
import { Interps } from '../../../interp'
import { lowerTrim } from './../../../helpers'

export default function ColorCurveSelector() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.color.curve
  const curveName = Interps[value].name
  const options = Object.keys(Interps).map(key => Interps[key].name)

  const label = 'Mapping curve'
  const id = lowerTrim(label)
  const tooltip = 'Curve used to shape the colour mapping'

  function onChange(e) {
    const selectedValue = e.target.value
    const interpKey = Object.keys(Interps).find(key => Interps[key].name === selectedValue)
    setValue(interpKey)
  }

  return (
    <OptionSelector label={label} id={id} tooltip={tooltip} options={options} value={curveName} onChange={onChange} />
  )
}
