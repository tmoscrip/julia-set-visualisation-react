import React from 'react'
import InputField from '../base_components/InputField'

export default function PresetNameField({ value, onChange }) {
  const id = 'presetname'
  const label = 'Preset name'

  return <InputField id={id} label={label} value={value} onChange={onChange} />
}
