import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import CollapsibleGroup from './CollapsibleGroup'
import { useEffect } from 'react'
import { parseHexColor, generateTextureData } from '../../texture'
import { Interps } from './../../interp'
import { ColorSpaces } from './../../colorspace'
import { TEX_WIDTH, TEX_HEIGHT } from './../../texture'
import UPNG from 'upng'

function CurveSelector({ value, onChange }) {
  return (
    <div className='field-container'>
      <label htmlFor='curves'>Curve</label>
      <select id='curves' onChange={onChange} value={value}>
        {Object.keys(Interps).map((item, i) => {
          let obj = Interps[item]
          return (
            <option key={i} id={obj.value} value={obj.value}>
              {obj.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

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

function ColorMapImage({ textureBase64 }) {
  return textureBase64 !== null ? (
    <img className='colormap-img' alt='' src={`data:image/png;base64,${textureBase64}`} />
  ) : null
}

function ColorSpaceSelector({ value, onChange }) {
  return (
    <div className='field-container'>
      <label htmlFor='colorspace'>Colour space</label>
      <select id='colorspace' onChange={onChange} value={value}>
        {ColorSpaces.map((item, i) => {
          let name = item.name
          return (
            <option key={i} id={name} value={name}>
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
function useTextureBuilder() {
  const ctx = useContext(ShaderContext)
  const [colorPoints] = ctx.color.colorPoints
  const [curve] = ctx.color.curve
  const [colorSpace] = ctx.color.colorSpace
  const [textureData, setTextureData] = ctx.color.textureData

  useEffect(() => {
    const cp = colorPoints.map(o => {
      return {
        color: parseHexColor(o.hex),
        position: o.position,
      }
    })
    const newTextureData = generateTextureData(cp, curve, colorSpace)
    setTextureData(newTextureData)
  }, [colorPoints, curve, colorSpace, setTextureData])

  return textureData
}

function useTextureBase64() {
  const ctx = useContext(ShaderContext)
  const [textureData] = ctx.color.textureData

  if (textureData !== '') {
    const pngArrayBuffer = UPNG.encode(textureData, TEX_WIDTH, TEX_HEIGHT, 0, [])
    return btoa(String.fromCharCode.apply(null, new Uint8Array(pngArrayBuffer)))
  }

  return null
}

function useCurveSelector() {
  const ctx = useContext(ShaderContext)
  const [curve, setCurve] = ctx.color.curve

  return [curve, setCurve]
}

function useColorSpaceSelector() {
  const ctx = useContext(ShaderContext)
  const [colorSpace, setColorSpace] = ctx.color.colorSpace

  return [colorSpace, setColorSpace]
}

export default function ColorMap() {
  const ctx = useContext(ShaderContext)
  const [colorPoints, setColorPoints] = ctx.color.colorPoints
  const minPoints = 2

  useTextureBuilder()
  const textureBase64 = useTextureBase64()
  const [curve, setCurve] = useCurveSelector()
  const [colorSpace, setColorSpace] = useColorSpaceSelector()

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

    // https://stackoverflow.com/questions/54620928/useeffect-hook-not-firing-after-state-change/54621059#54621059
    // When updating an array stored in state, a new array must be created for a change to be detected
    // Otherwise, effects dependant on the state will not trigger on update
    const nextColorPoints = [...colorPoints]
    nextColorPoints[idx] = nextObj
    setColorPoints(nextColorPoints)
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

  function handleCurveSelectorChange(e) {
    const newValue = e.target.value
    setCurve(newValue)
  }

  function handleColorSpaceSelectorChange(e) {
    const newValue = e.target.value
    console.log(newValue)
    setColorSpace(newValue)
  }

  return (
    <CollapsibleGroup title='Color mapping'>
      <ColorPointControls addPoint={addPoint} removePoint={removePoint} />
      {colorPoints.map((o, i) => (
        <CombinedColorField key={i} combinedColorObj={o} handleFieldChange={handleFieldChange} idx={i} />
      ))}
      <CurveSelector value={curve} onChange={handleCurveSelectorChange} />
      <ColorSpaceSelector value={colorSpace} onChange={handleColorSpaceSelectorChange} />
      <ColorMapImage textureBase64={textureBase64} />
    </CollapsibleGroup>
  )
}
