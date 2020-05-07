import React from 'react'
import Button from './../base_components/Button'
import Item from '../base_components/Item'
import { saveCanvasAsImage } from './../../ShaderCanvas';

export default function ScreenshotButton() {
  const text = 'Save screenshot'
  const className = 'btn-full'

  return (
    <Item>
      <Button text={text} onClick={saveCanvasAsImage} className={className} />
    </Item>
  )
}
