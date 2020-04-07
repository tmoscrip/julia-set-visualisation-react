import PropTypes from 'prop-types'
import React from 'react'

import Item from './Item'
import Label from './Label'

function Option({ item }) {
  return <option value={item}>{item}</option>
}

export default function OptionSelector({ label, tooltip, id, options, value, onChange }) {
  label = label || null
  tooltip = tooltip || null

  return (
    <Item>
      {label ? <Label htmlFor={id} text={label} tooltip={tooltip} /> : null}
      <select id={id} name={id} value={value} onChange={onChange}>
        {options.map((item, idx) => (
          <Option key={idx} item={item} />
        ))}
      </select>
    </Item>
  )
}

OptionSelector.propTypes = {
  label: PropTypes.string,
  tooptip: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
}
