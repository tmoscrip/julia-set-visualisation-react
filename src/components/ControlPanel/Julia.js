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

function HumanReadableFormula() {
  const ctx = useContext(ShaderContext)
  const [coefficients] = ctx.julia.coefficients
  const termList = getTermList(coefficients)

  function PolynomialTerm({ term, isFirst }) {
    const { exp, coeff } = term

    // Don't render anything for zero-terms
    if (coeff === 0) {
      return null
    }

    const coeffSign = (coeff, isFirst) => {
      if (coeff < 0) {
        return `\u{2212}`
      } else {
        return isFirst ? null : `\u{002B}`
      }
    }

    const renderTerm = coeff => {
      const abs = Math.abs(coeff)
      if (abs !== 1) {
        if (coeff < 0) {
          return `${abs}\u{00B7}`
        } else {
          return `${coeff}\u{00B7}`
        }
      }
      return null
    }

    switch (exp) {
      // C
      case 0:
        return (
          <span className='poly-term'>
            {coeffSign(coeff, isFirst)}
            {renderTerm(coeff)}C
          </span>
        )
      // Z no exponent
      case 1:
        return (
          <span className='poly-term'>
            {coeffSign(coeff, isFirst)}
            {renderTerm(coeff)}Z
          </span>
        )
      default:
        return (
          <span className='poly-term'>
            {coeffSign(coeff, isFirst)}
            {renderTerm(coeff)}Z<sup>{exp}</sup>
          </span>
        )
    }
  }

  function getTermList(ctxCoefficients) {
    const coeffList = ctxCoefficients.replace(/\s/g, '').split(',')
    let termList = []
    for (let i = 0; i < coeffList.length; i++) {
      const exp = coeffList.length - (i + 1)
      const coeff = parseFloat(coeffList[i])
      termList.push({ exp, coeff })
    }
    return termList
  }

  return (
    <div>
      {termList.map((t, i) => (
        <PolynomialTerm term={t} isFirst={i === 0} />
      ))}
    </div>
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

function TimeScale() {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = ctx.time.timeScale

  const helpText = 'Time scale'

  return <LabelledField label='Time scale' helpText={helpText} inputValue={inputValue} setInputValue={setInputValue} />
}

export default function JuliaVariables() {
  const title = 'Julia Variables'

  return (
    <CollapsibleGroup title={title}>
      <CValueX />
      <CValueY />
      <PolyCoefficients />
      <HumanReadableFormula />
      <MaxIterations />
      <EscapeRadius />
      <SmoothingToggle />
      <TimeScale />
    </CollapsibleGroup>
  )
}
