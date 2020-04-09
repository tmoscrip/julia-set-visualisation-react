import React from 'react'
import Button from '../base_components/Button'
import Item from '../base_components/Item'

export default function ToggleMenuButton({ onClick }) {
  const text = 'Toggle Menu'
  const className = 'btn-full'
  return (
    <Item>
      <Button text={text} onClick={onClick} className={className} />
    </Item>
  )
}
