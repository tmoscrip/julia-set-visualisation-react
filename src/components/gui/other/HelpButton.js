import React, { useContext } from 'react'
import Button from './../base_components/Button'
import Item from '../base_components/Item'
import { ShaderContext } from './../../ModelProvider'

export default function HelpButton() {
  const ctx = useContext(ShaderContext)
  const [, setShowModal] = ctx.showModal
  const text = 'Show help'
  const className = 'btn-full'

  function onClick() {
    setShowModal(true)
  }

  return (
    <Item>
      <Button text={text} onClick={onClick} className={className} />
    </Item>
  )
}
