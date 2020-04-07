import React, { useContext } from 'react'
import { ShaderContext } from './../../ModelProvider'
import InputField from './../base_components/InputField'
import Folder from '../base_components/Folder'
import { scaleViewportByAspectRatio } from './../../ShaderCanvas'

export default function DimensionsFolder() {
  const ctx = useContext(ShaderContext)
  const [width, setWidth] = ctx.viewport.width
  const [height, setHeight] = ctx.viewport.height
  const [lockAspectRatio] = ctx.viewport.lockAspectRatio

  function handleChanges(e) {
    let newViewport
    switch (e.target.name) {
      case 'viewportwidth':
        const newWidth = e.target.value
        newViewport = lockAspectRatio
          ? scaleViewportByAspectRatio({ width: newWidth, height, anchor: 'landscape' })
          : { width: newWidth, height }
        setWidth(newViewport.width)
        setHeight(newViewport.height)
        break
      case 'viewportheight':
        const newHeight = e.target.value
        newViewport = lockAspectRatio
          ? scaleViewportByAspectRatio({ width, height: newHeight, anchor: 'portrait' })
          : { width, height: newHeight }
        setWidth(newViewport.width)
        setHeight(newViewport.height)
        break
      default:
        break
    }
  }

  return (
    <Folder title='Dimensions'>
      <ViewportWidth value={width} onChange={handleChanges} />
      <ViewportHeight value={height} onChange={handleChanges} />
    </Folder>
  )
}

function ViewportWidth({ value, onChange }) {
  const label = 'Width'
  const id = 'viewportwidth'
  const tooltip = 'Width of the complex plane'

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}

function ViewportHeight({ value, onChange }) {
  const label = 'Height'
  const id = 'viewportheight'
  const tooltip = 'Height of the complex plane'

  return <InputField label={label} id={id} tooltip={tooltip} value={value} onChange={onChange} />
}
