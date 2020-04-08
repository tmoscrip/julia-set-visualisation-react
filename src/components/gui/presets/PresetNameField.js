import React from 'react'
import InputField from '../base_components/InputField'

export default function PresetNameField({ value, onChange }) {
  const id = 'presetname'


  return <InputField id={id} value={value} onChange={onChange} />
}
