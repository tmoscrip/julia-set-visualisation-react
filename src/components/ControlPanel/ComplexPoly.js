import React, { useContext } from 'react'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'

export default function ComplexPoly() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.complexPoly

  return <LabelledField label='CPQ' inputValue={inputValue} setInputValue={setInputValue} />
}
