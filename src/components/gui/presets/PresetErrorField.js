import React from 'react'
import Item from '../base_components/Item'

export default function PresetErrorField({ text }) {
  return text !== '' ? (
    <Item>
      <span className='error'>{text}</span>
    </Item>
  ) : null
}
