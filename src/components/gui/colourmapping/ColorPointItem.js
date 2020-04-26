import React from 'react'
import { PropTypes } from 'prop-types'
import InputField from './../base_components/InputField'
import Folder from '../base_components/Folder'
import { lowerTrim } from './../../../helpers'

function ColorPicker({ item, idx, handleChange }) {
  const value = item.hex
  const label = 'Colour'
  const name = 'color'
  const id = `${lowerTrim(label)}${idx}`

  function onChange(e) {
    handleChange(e, idx)
  }

  return <InputField type='color' label={label} name={name} id={id} value={value} onChange={onChange} />
}

function ColorPosition({ item, idx, handleChange }) {
  const value = item.position
  const locked = item.locked
  const label = 'Position'
  const name = 'position'
  const id = `${lowerTrim(label)}${idx}`
  const tooltip = "Value in range [0, 1] representing the colour's position on the colour mapping"

  function onChange(e) {
    handleChange(e, idx)
  }

  return (
    <InputField disabled={locked} type='text' label={label} name={name} id={id} tooltip={tooltip} value={value} onChange={onChange} />
  )
}

export default function ColorPointItem({ item, idx, handleChange }) {
  return (
    <Folder title={`Colour ${idx + 1}`}>
      <ColorPicker item={item} idx={idx} handleChange={handleChange} />
      <ColorPosition item={item} idx={idx} handleChange={handleChange} />
    </Folder>
  )
}

const propTypes = {
  item: PropTypes.shape({
    hex: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  idx: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
}

ColorPicker.propTypes = propTypes
ColorPosition.propTypes = propTypes
ColorPointItem.propTypes = propTypes
