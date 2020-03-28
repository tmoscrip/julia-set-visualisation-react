import React, { useContext } from 'react'
import { ShaderContext } from './../ModelProvider'
import { LabelledField, CheckboxField } from './InputTypes'

import CollapsibleGroup from './CollapsibleGroup'

function CValueX() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.c.x

  const helpText = 'C value x'

  return <LabelledField label='C Y' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}

function CValueY() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.c.y

  const helpText = 'C value y'

  return <LabelledField label='C X' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}

function PolyCoefficients() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.coefficients

  const helpText =
    'Comma-seperated values for the coefficients of each polynomial term. N values applied in the order Z^^n-1 ... Z^^1, C'

  return (
    <LabelledField label='Coefficients' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
  )
}

function MaxIterations() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.maxIterations

  const helpText = 'Max iterations'

  return (
    <LabelledField label='Max Iterations' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
  )
}

function EscapeRadius() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.julia.escapeRadius

  const helpText = 'Escape radius'

  return (
    <LabelledField label='Escape radius' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
  )
}

function SmoothingToggle() {
  const ctx = useContext(ShaderContext)
  const [value, setValue] = ctx.julia.useSmoothing

  const label = 'Julia smoothing'
  const helpText = 'Toggle Julia iteration smoothing'

  return <CheckboxField label={label} helpText={helpText} inputValue={value} setInputValue={setValue} />
}

export default function JuliaVariables() {
  const title = 'Julia Variables'

  return (
    <CollapsibleGroup title={title}>
      <CValueX />
      <CValueY />
      <PolyCoefficients />
      <MaxIterations />
      <EscapeRadius />
      <SmoothingToggle />
    </CollapsibleGroup>
  )
}
