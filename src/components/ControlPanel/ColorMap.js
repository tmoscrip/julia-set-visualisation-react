import React, { useContext } from 'react'
import LabelledField from './LabelledField'
import { ShaderContext } from './../ModelProvider';

export default function ColorMap() {
  const ctx = useContext(ShaderContext)
  const [colorOne, setColorOne] = ctx.colorMap[0].color
  const [colorTwo, setColorTwo] = ctx.colorMap[1].color

  return (
    <div>
      <LabelledField label='hex 1' inputValue={colorOne} setInputValue={setColorOne} />
      <LabelledField label='hex 2' inputValue={colorTwo} setInputValue={setColorTwo} />
    </div>
  )
}
