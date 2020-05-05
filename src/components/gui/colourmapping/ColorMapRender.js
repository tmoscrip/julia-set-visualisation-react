import React, { useContext, useState, useEffect } from 'react'
import Base64Image from '../base_components/Base64Image'
import Item from '../base_components/Item'
import { ShaderContext } from './../../ModelProvider'
import UPNG from 'upng'
import { TEX_WIDTH, TEX_HEIGHT } from './../../../texture'

function useColorMapBase64() {
  const ctx = useContext(ShaderContext)
  const [textureData] = ctx.color.textureData
  const [base64, setBase64] = useState()

  useEffect(() => {
    if (textureData.length >= 4) {
      const pngArrayBuffer = UPNG.encode(textureData, TEX_WIDTH, TEX_HEIGHT, 0, [])
      setBase64(btoa(String.fromCharCode.apply(null, new Uint8Array(pngArrayBuffer))))
    }
  }, [textureData])

  return base64
}

export default function ColorMapRender() {
  const encoding = 'png'

  const data = useColorMapBase64()

  return data !== null ? (
    <Item>
      <Base64Image className='colormap' data={data} encoding={encoding} />
    </Item>
  ) : null
}
