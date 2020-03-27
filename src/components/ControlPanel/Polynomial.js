import React, { useContext } from 'react'
import { ShaderContext } from '../ModelProvider'
import LabelledField from './LabelledField'

function PolyCoefficients() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.coefficients

  const helpText =
    'Comma-seperated values for the co-efficients of each polynomial term. N values applied in the order Z^^n-1 ... Z^^1, C'

  return (
    <LabelledField label='Co-efficients' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
  )
}

export default function Polynomial() {
  return (
    <>
      <PolyCoefficients />
    </>
  )
}
