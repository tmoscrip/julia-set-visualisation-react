import React from 'react'
import Item from './Item'
import Label from './Label'
import { PropTypes } from 'prop-types'

export default function InputField({ type, label, name, tooltip, id, value, onChange }) {
  type = type || 'text' // Default to textbox
  name = name || id // Reuse id if name not provided
  label = label || null
  tooltip = tooltip || null

  return (
    <Item>
      {label ? <Label htmlFor={id} text={label} tooltip={tooltip} /> : null}
      <input type={type} name={name} id={id} value={value} checked={value} onChange={onChange} />
    </Item>
  )
}

InputField.propTypes = {
  type: PropTypes.oneOf(['text', 'checkbox', 'color']),
  label: PropTypes.string,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
}
