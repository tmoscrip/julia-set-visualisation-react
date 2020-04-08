import React from 'react'
import Button from './../base_components/Button'
import Item from '../base_components/Item'

function PresetButtonSave({ onClick }) {
  const text = 'Save'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

function PresetButtonLoad({ onClick }) {
  const text = 'Load'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

export default function PresetButtons({ onClickSave, onClickLoad }) {
  return (
    <Item>
      <PresetButtonSave onClick={onClickSave} />
      <PresetButtonLoad onClick={onClickLoad} />
    </Item>
  )
}
