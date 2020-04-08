import React from 'react'
import OptionSelector from '../base_components/OptionSelector'

export default function PresetSelector({ options, value, onChange }) {
  const id = 'presetselector'

  return <OptionSelector id={id} options={options} value={value} onChange={onChange} />
}
