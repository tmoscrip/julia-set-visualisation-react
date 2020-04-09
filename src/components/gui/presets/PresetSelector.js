import React from 'react'
import OptionSelector from '../base_components/OptionSelector'

export default function PresetSelector({ options, value, onChange }) {
  const id = 'presetselector'
  const label = 'Presets'

  return <OptionSelector id={id} label={label} options={options} value={value} onChange={onChange} />
}
