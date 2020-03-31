import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import CollapsibleGroup from './CollapsibleGroup'


function ColorValue({ value, onChange }) {
  const label = 'Color'

  return (
    <div className='field-container'>
      <span className='panel-label'>{label}</span>
      <input className='panel-input' name={label} value={value} onChange={onChange} />
    </div>
  )
}

function ColorPosition({ value, onChange }) {
  const label = 'Position'

  return (
    <div className='field-container'>
      <span className='panel-label'>{label}</span>
      <input className='panel-input' name={label} value={value} onChange={onChange} />
    </div>
  )
}

function CombinedColorField({ combinedColorObj, idx, handleFieldChange }) {
  const { hex, position } = combinedColorObj

  function handleChildChange(e) {
    handleFieldChange(e, idx)
  }

  return (
    <>
      <ColorValue value={hex} onChange={handleChildChange} />
      <ColorPosition value={position} onChange={handleChildChange} />
    </>
  )
}

function ColorPointControls({ addPoint, removePoint }) {
  return (
    <>
      <button className='point-control-btn' onClick={addPoint}>
        +
      </button>
      <button className='point-control-btn' onClick={removePoint}>
        -
      </button>
    </>
  )
}

export default function ColorMap() {
  const ctx = useContext(ShaderContext)
  const [colorPoints, setColorPoints] = ctx.color.colorPoints

  const minPoints = 2

  function handleFieldChange(e, idx) {
    const newValue = e.target.value
    const objAtIdx = colorPoints[idx]

    const nextObj = (() => {
      switch (e.target.name.toLowerCase()) {
        case 'color':
          return { ...objAtIdx, hex: newValue }
        case 'position':
          return { ...objAtIdx, position: newValue }
        default:
          return objAtIdx
      }
    }).call()

    colorPoints[idx] = nextObj
    setColorPoints(colorPoints)
  }

  function addPoint() {
    colorPoints.push({
      hex: '',
      position: '',
    })
    setColorPoints(colorPoints)
  }

  function removePoint() {
    const pointsCount = colorPoints.length

    if (pointsCount <= minPoints) {
      return
    }

    colorPoints.pop()
    setColorPoints(colorPoints)
  }

  return (
    <CollapsibleGroup title='Color mapping'>
      <ColorPointControls addPoint={addPoint} removePoint={removePoint} />
      {colorPoints.map((o, i) => (
        <CombinedColorField key={i} combinedColorObj={o} handleFieldChange={handleFieldChange} idx={i} />
      ))}
    </CollapsibleGroup>
  )
}
